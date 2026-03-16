#!/bin/bash
# ===================================================
# SpecialAigent - セットアップスクリプト
# tmuxセッションを構築し、将軍・家老・足軽を配置する
#
# 使い方:
#   bash setup.sh        # フルセットアップ（tmux + エージェント起動）
#   bash setup.sh --init  # 初期設定のみ（ディレクトリ・権限）
#   bash setup.sh --tmux  # tmuxセッションのみ構築
# ===================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SESSION_NAME="multiagent"

# 色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  SpecialAigent セットアップ${NC}"
echo -e "${BLUE}  〜戦国AIエージェント軍団〜${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# --- 1. 初期設定 ---
init_setup() {
    echo -e "${GREEN}[初期設定] ディレクトリと権限を整備いたす...${NC}"

    # 必要なディレクトリを作成
    mkdir -p "$SCRIPT_DIR/queue/tasks"
    mkdir -p "$SCRIPT_DIR/queue/results"
    mkdir -p "$SCRIPT_DIR/status"
    mkdir -p "$SCRIPT_DIR/logs"
    mkdir -p "$SCRIPT_DIR/output"
    mkdir -p "$SCRIPT_DIR/cache"

    # スクリプトに実行権限を付与
    chmod +x "$SCRIPT_DIR/scripts/"*.sh 2>/dev/null || true

    # ログファイル初期化
    touch "$SCRIPT_DIR/logs/activity.log"
    touch "$SCRIPT_DIR/logs/command_counts.txt"

    # 初期ダッシュボード生成
    bash "$SCRIPT_DIR/scripts/dashboard.sh" once

    echo -e "${GREEN}[初期設定] 完了！${NC}"
}

# --- 2. 依存関係チェック ---
check_dependencies() {
    echo -e "${YELLOW}[確認] 必要なツールをチェックいたす...${NC}"

    local missing=0

    # tmux
    if command -v tmux &> /dev/null; then
        echo -e "  tmux: ${GREEN}OK${NC} ($(tmux -V))"
    else
        echo -e "  tmux: ${RED}未インストール${NC}"
        echo "    インストール方法:"
        echo "      Mac:     brew install tmux"
        echo "      Ubuntu:  sudo apt install tmux"
        echo "      Windows: WSLにて sudo apt install tmux"
        missing=1
    fi

    # claude (Claude Code CLI)
    if command -v claude &> /dev/null; then
        echo -e "  claude: ${GREEN}OK${NC}"
    else
        echo -e "  claude: ${YELLOW}未インストール（デモモードで動作可能）${NC}"
        echo "    インストール方法: npm install -g @anthropic-ai/claude-code"
    fi

    # bash
    if command -v bash &> /dev/null; then
        echo -e "  bash: ${GREEN}OK${NC}"
    else
        echo -e "  bash: ${RED}未インストール${NC}"
        missing=1
    fi

    if [ $missing -eq 1 ]; then
        echo ""
        echo -e "${RED}必須ツールが不足しておる。インストールしてから再度実行してくだされ。${NC}"
        exit 1
    fi

    echo ""
}

# --- 3. tmuxセッション構築 ---
setup_tmux() {
    echo -e "${GREEN}[tmux] 戦場（tmuxセッション）を構築いたす...${NC}"

    # 既存セッションを終了
    tmux kill-session -t "$SESSION_NAME" 2>/dev/null || true

    # 新規セッション作成（将軍ウィンドウ）
    tmux new-session -d -s "$SESSION_NAME" -n "shogun" -x 200 -y 50

    # 将軍ウィンドウの背景色を変更（威厳ある紺色）
    tmux set-option -t "$SESSION_NAME:0" window-style 'bg=#1a1a2e'
    tmux set-option -t "$SESSION_NAME:0" window-active-style 'bg=#1a1a2e'

    # 家老ウィンドウを作成
    tmux new-window -t "$SESSION_NAME" -n "karo"

    # 足軽ウィンドウを作成（3ペインに分割）
    tmux new-window -t "$SESSION_NAME" -n "ashigaru"
    tmux split-window -h -t "$SESSION_NAME:2"
    tmux split-window -v -t "$SESSION_NAME:2.0"

    # 各ペインにラベルを表示
    tmux send-keys -t "$SESSION_NAME:2.0" "echo '=== 足軽0 ==='" C-m
    tmux send-keys -t "$SESSION_NAME:2.1" "echo '=== 足軽1 ==='" C-m
    tmux send-keys -t "$SESSION_NAME:2.2" "echo '=== 足軽2 ==='" C-m

    # 将軍ウィンドウに戻る
    tmux select-window -t "$SESSION_NAME:0"

    echo -e "${GREEN}[tmux] 構築完了！${NC}"
    echo ""
    echo -e "  ウィンドウ構成："
    echo -e "    0:shogun   - 将軍（紺色背景・威厳）"
    echo -e "    1:karo     - 家老"
    echo -e "    2:ashigaru - 足軽×3（3ペイン分割）"
    echo ""
}

# --- 4. エージェント起動 ---
start_agents() {
    echo -e "${GREEN}[起動] エージェントを配置いたす...${NC}"

    # 将軍ウィンドウで将軍スクリプトを起動
    tmux send-keys -t "$SESSION_NAME:0" "cd '$SCRIPT_DIR' && bash scripts/shogun.sh" C-m

    # 家老ウィンドウでダッシュボード監視を起動
    tmux send-keys -t "$SESSION_NAME:1" "cd '$SCRIPT_DIR' && bash scripts/dashboard.sh" C-m

    echo -e "${GREEN}[起動] 全員配置完了！${NC}"
    echo ""
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}  準備完了！以下のコマンドで参陣せよ：${NC}"
    echo -e "${BLUE}  tmux attach -t ${SESSION_NAME}${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
    echo -e "操作方法："
    echo -e "  Ctrl+b → 0  : 将軍ウィンドウ（コマンド入力）"
    echo -e "  Ctrl+b → 1  : 家老ウィンドウ（ダッシュボード）"
    echo -e "  Ctrl+b → 2  : 足軽ウィンドウ（並列実行状況）"
    echo -e "  Ctrl+b → d  : セッションから離脱"
    echo ""
    echo -e "ダッシュボード（VSCode向け）："
    echo -e "  status/dashboard.md をMarkdownプレビューで開いてください"
    echo ""
}

# --- メイン ---
case "${1:-}" in
    --init)
        init_setup
        ;;
    --tmux)
        check_dependencies
        setup_tmux
        ;;
    *)
        init_setup
        check_dependencies
        setup_tmux
        start_agents
        ;;
esac
