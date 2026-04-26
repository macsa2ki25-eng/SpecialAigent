"""承認キューを扱う CLI フロー。

data/posts/pending/ にある JSON を1つずつ人間に見せ、
 y=承認 / n=却下 / e=編集 / s=スキップ / q=中断
で仕分ける。承認済みはファイルの status を approved に書き換える。

X投稿(type=x) と ブログ記事(type=blog) の両方を扱う。
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


def list_approved(*, post_type: str | None = None) -> list[Path]:
    """承認済みだがまだ投稿されていないファイル一覧。

    post_type を指定すると ("x" | "blog") そのタイプだけに絞る。
    """
    results = []
    for p in PENDING_DIR.glob("*.json"):
        data = json.loads(p.read_text(encoding="utf-8"))
        if data.get("status") != "approved":
            continue
        if post_type and data.get("type") != post_type:
            continue
        results.append(p)
    return sorted(results)


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
    """$EDITOR を起動してテキストを編集させる。Windowsなら notepad。"""
    editor = os.environ.get("EDITOR")
    if not editor:
        editor = "notepad" if os.name == "nt" else "vi"
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


def _render_x_post(post: dict, idx: int, total: int) -> str:
    title = (
        f"[{idx}/{total}] X投稿 / 型: {post.get('pattern_name', '?')} / "
        f"商品: {post.get('product_id', '?')} / 文字数: {post.get('char_count', 0)}"
    )
    if post.get("over_limit"):
        title += " (140字超過!)"
    body = post.get("text", "")
    reply = post.get("reply_text")
    if reply:
        body += "\n\n--- リプライ(自動投稿) ---\n" + reply
    return title, body


def _render_blog_post(post: dict, idx: int, total: int) -> tuple[str, str]:
    title = (
        f"[{idx}/{total}] ブログ / 型: {post.get('pattern_name', '?')} / "
        f"商品: {post.get('product_id', '?')} / 文字数: {post.get('char_count', 0)}"
    )
    body = f"# {post.get('title', '(no title)')}\n\n{post.get('body_markdown', '')}"
    return title, body


def review_all() -> dict[str, int]:
    """承認キューを対話的に処理。結果のサマリを返す。"""
    paths = list_pending()
    paths = [p for p in paths if json.loads(p.read_text(encoding="utf-8")).get("status") != "approved"]
    if not paths:
        console.print("[yellow]承認待ちの投稿はありません。[/yellow]")
        return {"approved": 0, "rejected": 0, "skipped": 0}

    counts = {"approved": 0, "rejected": 0, "skipped": 0}

    for idx, path in enumerate(paths, start=1):
        post = json.loads(path.read_text(encoding="utf-8"))
        post_type = post.get("type", "x")

        if post_type == "blog":
            header, body = _render_blog_post(post, idx, len(paths))
        else:
            header, body = _render_x_post(post, idx, len(paths))

        console.print(Panel(body, title=header, border_style="cyan"))

        choice = Prompt.ask(
            "操作を選択 (y=承認 / n=却下 / e=編集して承認 / s=スキップ / q=中断)",
            choices=["y", "n", "e", "s", "q"],
            default="y",
            show_choices=False,
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
            if post_type == "blog":
                # ブログはタイトルと本文を続けて編集
                combined = f"{post.get('title', '')}\n\n{post.get('body_markdown', '')}"
                edited = _edit_text(combined)
                lines = edited.splitlines()
                new_title = lines[0].strip() if lines else ""
                new_body = "\n".join(lines[1:]).lstrip("\n")
                post["title"] = new_title
                post["body_markdown"] = new_body
                post["char_count"] = len(new_body)
            else:
                edited = _edit_text(post.get("text", ""))
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
