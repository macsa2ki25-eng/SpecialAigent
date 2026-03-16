#!/bin/bash
# ===================================================
# SpecialAigent - 家老（Karo）
# 将軍の命を受け、タスクを分解して足軽に展開する
# ===================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOGS_DIR="$PROJECT_DIR/logs"
TASKS_DIR="$PROJECT_DIR/queue/tasks"
RESULTS_DIR="$PROJECT_DIR/queue/results"

# ログ出力関数
log() {
    local msg="$1"
    local timestamp
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [家老] $msg" | tee -a "$LOGS_DIR/activity.log"
}

# タスクを分解する
decompose_task() {
    local command="$1"
    local persona="$2"
    local task_base_id
    task_base_id="task_$(date '+%Y%m%d_%H%M%S')"

    log "はっ！承知つかまつった！タスクを分解いたす。"
    log "命令：「${command}」"
    log "ペルソナ：${persona}"

    # タスクの内容に応じてサブタスクに分解
    # 実際のClaude Code環境では、ここでClaude APIを呼んでタスク分解する
    # このスクリプトはその外枠（オーケストレーション）を提供する

    # サブタスク数を決定（最大3体の足軽に分散）
    local subtask_count=1

    # 複合的なタスクかどうか判定
    if echo "$command" | grep -qE "と|及び|かつ|それから|あと|ついでに"; then
        subtask_count=3
    elif echo "$command" | grep -qiE "テスト.*解答|一覧.*集計|調査.*まとめ"; then
        subtask_count=2
    fi

    log "サブタスク数：${subtask_count}体の足軽に展開いたす。"

    # 足軽にタスクを割り当て
    for i in $(seq 0 $((subtask_count - 1))); do
        local agent_id="ashigaru${i}"
        local sub_task_id="${task_base_id}_${i}"

        bash "$SCRIPT_DIR/task_manager.sh" create \
            "$sub_task_id" "$agent_id" "execute" \
            "$command (Part $((i + 1))/${subtask_count})" \
            "$command" "$persona"

        log "足軽${i}に任務を割り当てた：${sub_task_id}"
    done

    # 足軽を並列で起動
    log "足軽ども、並列で実行せよ！"
    local pids=()
    for i in $(seq 0 $((subtask_count - 1))); do
        local agent_id="ashigaru${i}"
        local sub_task_id="${task_base_id}_${i}"
        bash "$SCRIPT_DIR/ashigaru.sh" "$agent_id" "$sub_task_id" "$command" "$persona" &
        pids+=($!)
    done

    # 全足軽の完了を待つ
    log "足軽の帰還を待っておる..."
    for pid in "${pids[@]}"; do
        wait "$pid"
    done

    log "全足軽の任務完了を確認いたした！将軍に報告いたす。"

    # 結果を集約
    log "--- 結果報告 ---"
    for f in "$RESULTS_DIR"/${task_base_id}*.yaml 2>/dev/null; do
        [ -f "$f" ] || continue
        local rstatus
        rstatus=$(grep 'status:' "$f" | head -1 | sed 's/.*: *"\(.*\)"/\1/')
        local ragent
        ragent=$(grep 'agent_id:' "$f" | head -1 | sed 's/.*: *"\(.*\)"/\1/')
        log "  [${ragent}] ${rstatus}"
    done
    log "--- 報告終了 ---"
}

# メイン
if [ $# -lt 1 ]; then
    echo "使い方: $0 <command> [persona]"
    exit 1
fi

decompose_task "$1" "${2:-default}"
