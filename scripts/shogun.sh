#!/bin/bash
# ===================================================
# SpecialAigent - 将軍（Shogun）
# 上様（人間）の命を受け、家老に戦略を伝達する最高指揮官
# ===================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOGS_DIR="$PROJECT_DIR/logs"
SKILLS_DIR="$PROJECT_DIR/skills"

# ログ出力関数
log() {
    local msg="$1"
    local timestamp
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [将軍] $msg" | tee -a "$LOGS_DIR/activity.log"
}

# Skill化提案チェック
check_skill_opportunity() {
    local command="$1"
    local count_file="$LOGS_DIR/command_counts.txt"

    touch "$count_file"

    # コマンド実行回数をカウント
    local current_count
    current_count=$(grep -c "^${command}$" "$count_file" 2>/dev/null || echo "0")
    echo "$command" >> "$count_file"
    current_count=$((current_count + 1))

    # 3回以上で提案
    if [ "$current_count" -eq 3 ]; then
        log "上様、「${command}」を${current_count}回実行しておる。Skill化すれば便利かと存ずるが、いかがでござろうか？"
        log "Skill化すれば、次回からはワンコマンドで実行できるようになるでござる。"
        return 0
    fi
    return 1
}

# タスクの種類を判定してペルソナを決定
detect_persona() {
    local input="$1"

    if echo "$input" | grep -qiE "英語|English|テスト|教材|文法|単語|リーディング|ライティング|Lesson|lesson"; then
        echo "english_teacher"
    elif echo "$input" | grep -qiE "進路|大学|志望理由|面接|推薦|AO|就職"; then
        echo "career_advisor"
    elif echo "$input" | grep -qiE "文書|通知|報告|議事録|メール|手紙|案内|お知らせ"; then
        echo "document_writer"
    elif echo "$input" | grep -qiE "ネットワーク|IP|サーバー|Wi-Fi|WiFi|セキュリティ|設定|トラブル|VLAN"; then
        echo "network_engineer"
    elif echo "$input" | grep -qiE "DX|デジタル|自動化|効率化|システム|アプリ|スクリプト"; then
        echo "dx_specialist"
    else
        echo "default"
    fi
}

# 将軍メインループ
main() {
    log "将軍、参上いたした！上様の御命令をお待ち申し上げる。"
    log "-------------------------------------------"
    log "【使い方】"
    log "  何でも自然言語で命令してくだされ。"
    log "  例: 「英語のテストを作れ」「進路だよりを作成せよ」"
    log "  終了: 「退陣」と申されよ"
    log "-------------------------------------------"

    # ダッシュボード初期化
    bash "$SCRIPT_DIR/dashboard.sh" once

    while true; do
        echo ""
        echo -n "上様> "
        read -r command

        # 空入力
        [ -z "$command" ] && continue

        # 終了コマンド
        case "$command" in
            退陣|exit|quit)
                log "上様、本日も大儀であった！将軍、退陣いたす！"
                break
                ;;
            状況|status)
                bash "$SCRIPT_DIR/task_manager.sh" status
                continue
                ;;
            クリア|clear)
                bash "$SCRIPT_DIR/task_manager.sh" clear
                continue
                ;;
        esac

        log "上様の御命令を承った：「${command}」"

        # ペルソナ判定
        local persona
        persona=$(detect_persona "$command")
        log "ペルソナ判定：${persona}"

        # Skill化チェック
        check_skill_opportunity "$command"

        # 家老にタスク分解を指示
        log "家老、このタスクを分解せよ！「${command}」"
        bash "$SCRIPT_DIR/karo.sh" "$command" "$persona"

        # ダッシュボード更新
        bash "$SCRIPT_DIR/dashboard.sh" once

        log "上様、任務は家老・足軽に展開いたした。ダッシュボードにて進捗を御覧くだされ。"
    done
}

main "$@"
