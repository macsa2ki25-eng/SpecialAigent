#!/bin/bash
# ===================================================
# SpecialAigent - タスクマネージャー
# YAML形式のタスクキューを管理する
# ===================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
TASKS_DIR="$PROJECT_DIR/queue/tasks"
RESULTS_DIR="$PROJECT_DIR/queue/results"
DASHBOARD_FILE="$PROJECT_DIR/status/dashboard.md"

# --- タスク作成 ---
create_task() {
    local task_id="$1"
    local agent_id="$2"
    local command="$3"
    local description="$4"
    local content="$5"
    local persona="${6:-default}"
    local timestamp
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    cat > "$TASKS_DIR/${agent_id}_${task_id}.yaml" << EOF
task_id: "${task_id}"
agent_id: "${agent_id}"
command: "${command}"
description: "${description}"
content: |
$(echo "$content" | sed 's/^/  /')
persona: "${persona}"
status: "pending"
created_at: "${timestamp}"
priority: "normal"
EOF

    echo "[家老] タスク ${task_id} を ${agent_id} に割り当てたでござる！"
}

# --- タスク結果を記録 ---
record_result() {
    local task_id="$1"
    local agent_id="$2"
    local status="$3"  # success / error
    local result="$4"
    local timestamp
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    cat > "$RESULTS_DIR/${agent_id}_${task_id}.yaml" << EOF
task_id: "${task_id}"
agent_id: "${agent_id}"
status: "${status}"
completed_at: "${timestamp}"
result: |
$(echo "$result" | sed 's/^/  /')
EOF

    if [ "$status" = "success" ]; then
        echo "[${agent_id}] はっ！任務 ${task_id} 完了でござる！"
    else
        echo "[${agent_id}] むっ...任務 ${task_id} でエラーでござる..."
    fi
}

# --- 全タスクの状態を取得 ---
get_all_status() {
    echo "=== タスク状況報告 ==="
    echo ""
    echo "--- 未完了タスク ---"
    for f in "$TASKS_DIR"/*.yaml 2>/dev/null; do
        [ -f "$f" ] || continue
        local tid agent status
        tid=$(grep 'task_id:' "$f" | head -1 | sed 's/.*: *"\(.*\)"/\1/')
        agent=$(grep 'agent_id:' "$f" | head -1 | sed 's/.*: *"\(.*\)"/\1/')
        status=$(grep 'status:' "$f" | head -1 | sed 's/.*: *"\(.*\)"/\1/')
        echo "  [$agent] $tid : $status"
    done

    echo ""
    echo "--- 完了タスク ---"
    for f in "$RESULTS_DIR"/*.yaml 2>/dev/null; do
        [ -f "$f" ] || continue
        local tid agent status
        tid=$(grep 'task_id:' "$f" | head -1 | sed 's/.*: *"\(.*\)"/\1/')
        agent=$(grep 'agent_id:' "$f" | head -1 | sed 's/.*: *"\(.*\)"/\1/')
        status=$(grep 'status:' "$f" | head -1 | sed 's/.*: *"\(.*\)"/\1/')
        echo "  [$agent] $tid : $status"
    done
}

# --- キューをクリア ---
clear_queue() {
    rm -f "$TASKS_DIR"/*.yaml "$RESULTS_DIR"/*.yaml
    echo "[家老] タスクキューを一掃いたした！"
}

# --- コマンドディスパッチ ---
case "${1:-}" in
    create)   create_task "$2" "$3" "$4" "$5" "$6" "$7" ;;
    result)   record_result "$2" "$3" "$4" "$5" ;;
    status)   get_all_status ;;
    clear)    clear_queue ;;
    *)
        echo "使い方: $0 {create|result|status|clear} [args...]"
        echo "  create <task_id> <agent_id> <command> <description> <content> [persona]"
        echo "  result <task_id> <agent_id> <status> <result>"
        echo "  status"
        echo "  clear"
        ;;
esac
