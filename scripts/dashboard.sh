#!/bin/bash
# ===================================================
# SpecialAigent - ダッシュボード更新スクリプト
# status/dashboard.md をリアルタイムで更新する
# ===================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
TASKS_DIR="$PROJECT_DIR/queue/tasks"
RESULTS_DIR="$PROJECT_DIR/queue/results"
DASHBOARD_FILE="$PROJECT_DIR/status/dashboard.md"
LOGS_DIR="$PROJECT_DIR/logs"

update_dashboard() {
    local timestamp
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    # タスク集計
    local total_tasks=0
    local pending=0
    local running=0
    local completed=0
    local errors=0

    for f in "$TASKS_DIR"/*.yaml 2>/dev/null; do
        [ -f "$f" ] || continue
        total_tasks=$((total_tasks + 1))
        local status
        status=$(grep 'status:' "$f" | head -1 | sed 's/.*: *"\(.*\)"/\1/')
        case "$status" in
            pending)    pending=$((pending + 1)) ;;
            running)    running=$((running + 1)) ;;
            completed)  completed=$((completed + 1)) ;;
            error)      errors=$((errors + 1)) ;;
        esac
    done

    # 完了結果をカウント
    local result_count=0
    local success_count=0
    local error_count=0
    for f in "$RESULTS_DIR"/*.yaml 2>/dev/null; do
        [ -f "$f" ] || continue
        result_count=$((result_count + 1))
        local rstatus
        rstatus=$(grep 'status:' "$f" | head -1 | sed 's/.*: *"\(.*\)"/\1/')
        case "$rstatus" in
            success) success_count=$((success_count + 1)) ;;
            error)   error_count=$((error_count + 1)) ;;
        esac
    done

    # プログレスバー生成
    local total=$((total_tasks + result_count))
    local done=$((completed + success_count))
    local progress_bar=""
    if [ "$total" -gt 0 ]; then
        local pct=$((done * 100 / total))
        local filled=$((pct / 5))
        local empty=$((20 - filled))
        progress_bar=$(printf '%0.s#' $(seq 1 $filled 2>/dev/null))$(printf '%0.s-' $(seq 1 $empty 2>/dev/null))
        progress_bar="[$progress_bar] ${pct}%"
    else
        progress_bar="[--------------------] 待機中"
    fi

    # ダッシュボード書き出し
    cat > "$DASHBOARD_FILE" << EOF
# SpecialAigent Dashboard

> 最終更新: ${timestamp}

## 全体進捗

${progress_bar}

| 状態 | 件数 |
|------|------|
| 待機中 | ${pending} |
| 実行中 | ${running} |
| 完了 | ${success_count} |
| エラー | ${error_count} |
| **合計** | **${total}** |

## 足軽の状況

EOF

    # 各足軽の状態
    for i in 0 1 2; do
        local agent="ashigaru${i}"
        local agent_status="待機中"
        local agent_task="-"

        # 実行中タスクを探す
        for f in "$TASKS_DIR"/${agent}_*.yaml 2>/dev/null; do
            [ -f "$f" ] || continue
            local s
            s=$(grep 'status:' "$f" | head -1 | sed 's/.*: *"\(.*\)"/\1/')
            if [ "$s" = "running" ]; then
                agent_status="実行中"
                agent_task=$(grep 'description:' "$f" | head -1 | sed 's/.*: *"\(.*\)"/\1/')
            fi
        done

        echo "### 足軽${i}" >> "$DASHBOARD_FILE"
        echo "- 状態: ${agent_status}" >> "$DASHBOARD_FILE"
        echo "- タスク: ${agent_task}" >> "$DASHBOARD_FILE"
        echo "" >> "$DASHBOARD_FILE"
    done

    # 最近のログ
    echo "## 最近の報告" >> "$DASHBOARD_FILE"
    echo "" >> "$DASHBOARD_FILE"
    echo '```' >> "$DASHBOARD_FILE"
    if [ -f "$LOGS_DIR/activity.log" ]; then
        tail -20 "$LOGS_DIR/activity.log" >> "$DASHBOARD_FILE"
    else
        echo "（まだ活動記録はござらぬ）" >> "$DASHBOARD_FILE"
    fi
    echo '```' >> "$DASHBOARD_FILE"

    echo "" >> "$DASHBOARD_FILE"
    echo "---" >> "$DASHBOARD_FILE"
    echo "*上様、ダッシュボードを更新いたした。VSCodeのMarkdownプレビューで御覧くだされ。*" >> "$DASHBOARD_FILE"
}

# --- メインループ ---
if [ "${1:-}" = "once" ]; then
    update_dashboard
else
    echo "[家老] ダッシュボード監視を開始いたす..."
    while true; do
        update_dashboard
        sleep 5
    done
fi
