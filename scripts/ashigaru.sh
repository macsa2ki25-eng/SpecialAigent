#!/bin/bash
# ===================================================
# SpecialAigent - 足軽（Ashigaru）
# 家老の命を受け、具体的なタスクを実行する実働部隊
# ===================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOGS_DIR="$PROJECT_DIR/logs"
OUTPUT_DIR="$PROJECT_DIR/output"

# 出力ディレクトリ確保
mkdir -p "$OUTPUT_DIR"

# ログ出力関数
log() {
    local agent_id="$1"
    local msg="$2"
    local timestamp
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [${agent_id}] $msg" | tee -a "$LOGS_DIR/activity.log"
}

# タスクを実行する
execute_task() {
    local agent_id="$1"
    local task_id="$2"
    local command="$3"
    local persona="$4"

    log "$agent_id" "任務受領！「${command}」を実行中でござる..."

    # タスクファイルのステータスを更新
    local task_file="$PROJECT_DIR/queue/tasks/${agent_id}_${task_id}.yaml"
    if [ -f "$task_file" ]; then
        sed -i 's/status: "pending"/status: "running"/' "$task_file"
    fi

    # ============================================
    # ここが実際のタスク実行部分
    # Claude Code環境では、ここでclaude cliを呼び出す
    # ============================================

    # Claude CLIが利用可能かチェック
    if command -v claude &> /dev/null; then
        # Claude Code CLIで実行
        local persona_prompt=""
        case "$persona" in
            english_teacher)
                persona_prompt="あなたはベテランの高校英語教師です。学習指導要領に準拠した教材を作成してください。"
                ;;
            career_advisor)
                persona_prompt="あなたは進路指導の専門家です。高校生の進路選択を支援してください。"
                ;;
            document_writer)
                persona_prompt="あなたは校務文書の専門家です。公文書として適切な文書を作成してください。"
                ;;
            network_engineer)
                persona_prompt="あなたはネットワークエンジニアです。学校のICT環境の管理・改善を支援してください。"
                ;;
            dx_specialist)
                persona_prompt="あなたは校内DX推進の専門家です。学校業務のデジタル化を推進してください。"
                ;;
            *)
                persona_prompt="あなたは優秀なアシスタントです。"
                ;;
        esac

        local output_file="$OUTPUT_DIR/${task_id}_result.md"
        local full_prompt="${persona_prompt} 以下のタスクを実行してください: ${command}"

        # Claude CLI実行（--print でストリーミング出力なし、結果だけ取得）
        echo "$full_prompt" | claude --print > "$output_file" 2>&1
        local exit_code=$?

        if [ $exit_code -eq 0 ]; then
            log "$agent_id" "はっ！任務完了でござる！結果: ${output_file}"
            bash "$SCRIPT_DIR/task_manager.sh" result \
                "$task_id" "$agent_id" "success" \
                "結果をファイルに出力: ${output_file}"
        else
            log "$agent_id" "むっ...エラーでござる（終了コード: ${exit_code}）"
            bash "$SCRIPT_DIR/task_manager.sh" result \
                "$task_id" "$agent_id" "error" \
                "Claude CLI実行エラー（終了コード: ${exit_code}）"
        fi
    else
        # Claude CLIがない場合はプレースホルダー
        log "$agent_id" "Claude CLIが見つからぬ...デモモードで実行するでござる。"

        local output_file="$OUTPUT_DIR/${task_id}_result.md"
        cat > "$output_file" << EOF
# タスク実行結果（デモモード）

- **タスクID**: ${task_id}
- **実行者**: ${agent_id}
- **ペルソナ**: ${persona}
- **コマンド**: ${command}
- **実行日時**: $(date '+%Y-%m-%d %H:%M:%S')

## 注意

Claude CLIがインストールされていないため、デモモードで実行されました。
実際のClaude Code環境では、AIが自動的にタスクを実行します。

### Claude CLIのインストール方法

\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

インストール後、再度実行してください。
EOF

        log "$agent_id" "デモ結果を出力したでござる：${output_file}"
        bash "$SCRIPT_DIR/task_manager.sh" result \
            "$task_id" "$agent_id" "success" \
            "デモモード結果をファイルに出力: ${output_file}"
    fi

    # タスクファイルのステータスを完了に更新
    if [ -f "$task_file" ]; then
        sed -i 's/status: "running"/status: "completed"/' "$task_file"
    fi
}

# メイン
if [ $# -lt 3 ]; then
    echo "使い方: $0 <agent_id> <task_id> <command> [persona]"
    exit 1
fi

execute_task "$1" "$2" "$3" "${4:-default}"
