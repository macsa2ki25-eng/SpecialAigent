"""承認キューを扱う CLI フロー。

data/posts/pending/ にある JSON を1つずつ人間に見せ、
 y=承認 / n=却下 / e=編集 / s=スキップ / q=中断
で仕分ける。承認済みはファイルの status を approved に書き換える。
"""

from __future__ import annotations

import json
import os
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path

from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt

from src.config import PENDING_DIR, REJECTED_DIR

console = Console()


def list_pending() -> list[Path]:
    return sorted(PENDING_DIR.glob("*.json"))


def _save(post: dict, path: Path) -> None:
    path.write_text(json.dumps(post, ensure_ascii=False, indent=2), encoding="utf-8")


def _reject(path: Path) -> None:
    REJECTED_DIR.mkdir(parents=True, exist_ok=True)
    data = json.loads(path.read_text(encoding="utf-8"))
    data["status"] = "rejected"
    data["rejected_at"] = datetime.now(timezone.utc).isoformat()
    (REJECTED_DIR / path.name).write_text(
        json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    path.unlink()


def _edit_text(initial_text: str) -> str:
    """$EDITOR を起動してテキストを編集させる。未設定なら vi。"""
    editor = os.environ.get("EDITOR", "vi")
    with tempfile.NamedTemporaryFile(
        "w+", encoding="utf-8", suffix=".txt", delete=False
    ) as f:
        f.write(initial_text)
        tmp_path = f.name
    try:
        subprocess.call([editor, tmp_path])
        return Path(tmp_path).read_text(encoding="utf-8").strip()
    finally:
        os.unlink(tmp_path)


def review_all() -> dict[str, int]:
    """承認キューを対話的に処理。結果のサマリを返す。"""
    paths = list_pending()
    if not paths:
        console.print("[yellow]承認待ちの投稿はありません。[/yellow]")
        return {"approved": 0, "rejected": 0, "skipped": 0}

    counts = {"approved": 0, "rejected": 0, "skipped": 0}

    for idx, path in enumerate(paths, start=1):
        post = json.loads(path.read_text(encoding="utf-8"))
        header = (
            f"[{idx}/{len(paths)}] 型: {post['pattern_name']} / "
            f"テーマ: {post['topic']} / 文字数: {post['char_count']}"
        )
        if post.get("over_limit"):
            header += " [red](140字超過!)[/red]"

        console.print(Panel(post["text"], title=header, border_style="cyan"))

        choice = Prompt.ask(
            "操作を選択",
            choices=["y", "n", "e", "s", "q"],
            default="y",
            show_choices=True,
        )

        if choice == "q":
            console.print("[yellow]中断しました。[/yellow]")
            break

        if choice == "y":
            post["status"] = "approved"
            post["approved_at"] = datetime.now(timezone.utc).isoformat()
            _save(post, path)
            counts["approved"] += 1
            console.print("[green]承認しました[/green]\n")

        elif choice == "n":
            _reject(path)
            counts["rejected"] += 1
            console.print("[red]却下しました[/red]\n")

        elif choice == "e":
            edited = _edit_text(post["text"])
            post["text"] = edited
            post["char_count"] = len(edited)
            post["over_limit"] = len(edited) > 140
            post["status"] = "approved"
            post["approved_at"] = datetime.now(timezone.utc).isoformat()
            post["edited"] = True
            _save(post, path)
            counts["approved"] += 1
            console.print("[green]編集して承認しました[/green]\n")

        elif choice == "s":
            counts["skipped"] += 1
            console.print("[dim]スキップ (保留のまま)[/dim]\n")

    return counts


def list_approved() -> list[Path]:
    """承認済みだがまだ投稿されていないファイル一覧。"""
    results = []
    for p in PENDING_DIR.glob("*.json"):
        data = json.loads(p.read_text(encoding="utf-8"))
        if data.get("status") == "approved":
            results.append(p)
    return sorted(results)
