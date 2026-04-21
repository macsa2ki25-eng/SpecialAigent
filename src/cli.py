"""SpecialAigent の統合 CLI。

使用例:
    python -m src.cli generate --count 5
    python -m src.cli review
    python -m src.cli publish
    python -m src.cli test-claude
    python -m src.cli test-x
    python -m src.cli status
"""

from __future__ import annotations

import json
import sys
from datetime import datetime, timezone

import click
from rich.console import Console
from rich.table import Table

from src.config import PENDING_DIR, PUBLISHED_DIR, REJECTED_DIR, Settings, ensure_dirs

console = Console()


@click.group()
def main() -> None:
    """X 自動投稿エージェント CLI"""
    ensure_dirs()


@main.command("generate")
@click.option("--count", default=3, type=int, help="生成する投稿数")
@click.option("--pattern", default=None, help="指定の型ID (viral_patterns.yaml 参照)")
@click.option("--topic", default=None, help="指定のテーマ")
def cmd_generate(count: int, pattern: str | None, topic: str | None) -> None:
    """Claude API で投稿文を生成し、承認キュー(pending)に入れる。"""
    from src.generator import Generator  # 遅延 import で test-x 時の ANTHROPIC 必須化を回避

    gen = Generator()
    paths = []
    with console.status(f"[cyan]{count} 件の投稿を生成中...[/cyan]"):
        if pattern or topic:
            for _ in range(count):
                post = gen.generate_one(pattern_id=pattern, topic=topic)
                p = PENDING_DIR / f"{post['id']}.json"
                p.write_text(
                    json.dumps(post, ensure_ascii=False, indent=2), encoding="utf-8"
                )
                paths.append(p)
        else:
            paths = gen.generate_batch(count)

    console.print(f"[green]✅ {len(paths)} 件を生成しました[/green]")
    console.print(f"次は [bold]python -m src.cli review[/bold] で確認してください。")


@main.command("review")
def cmd_review() -> None:
    """承認キューを1件ずつ対話でレビュー。"""
    from src.queue import review_all

    counts = review_all()
    console.print(
        f"[bold]結果:[/bold] 承認 {counts['approved']} / "
        f"却下 {counts['rejected']} / スキップ {counts['skipped']}"
    )
    if counts["approved"]:
        console.print(
            f"次は [bold]python -m src.cli publish[/bold] で投稿できます。"
        )


@main.command("publish")
@click.option("--limit", default=None, type=int, help="今回投稿する件数の上限")
@click.option("--dry-run", is_flag=True, help="投稿せず何が送られるかだけ表示")
def cmd_publish(limit: int | None, dry_run: bool) -> None:
    """承認済みの投稿を X に送信する。"""
    from src.publisher import Publisher
    from src.queue import list_approved

    settings = Settings.load()
    approved = list_approved()

    daily_cap = limit or settings.max_posts_per_day
    to_post = approved[:daily_cap]

    if not to_post:
        console.print("[yellow]承認済みの投稿がありません。[/yellow]")
        return

    console.print(f"[cyan]{len(to_post)} 件を投稿します (1日の上限: {daily_cap})[/cyan]")

    if dry_run:
        for p in to_post:
            post = json.loads(p.read_text(encoding="utf-8"))
            console.rule(post["pattern_name"])
            console.print(post["text"])
        console.print("[dim](dry-run なので実際には投稿していません)[/dim]")
        return

    publisher = Publisher(settings)
    success, failure = 0, 0
    for p in to_post:
        try:
            result = publisher.publish_from_file(p)
            console.print(f"[green]✅[/green] {result['url']}")
            success += 1
        except Exception as e:  # noqa: BLE001
            console.print(f"[red]❌ 失敗 {p.name}: {e}[/red]")
            failure += 1

    console.print(f"[bold]完了:[/bold] 成功 {success} / 失敗 {failure}")


@main.command("status")
def cmd_status() -> None:
    """キューの状態を表示する。"""
    pending = list(PENDING_DIR.glob("*.json"))
    approved = [
        p for p in pending if json.loads(p.read_text(encoding="utf-8")).get("status") == "approved"
    ]
    waiting = [p for p in pending if p not in approved]
    published = list(PUBLISHED_DIR.glob("*.json"))
    rejected = list(REJECTED_DIR.glob("*.json"))

    today = datetime.now(timezone.utc).strftime("%Y%m%d")
    published_today = [p for p in published if p.name.startswith(today)]

    table = Table(title="SpecialAigent ステータス")
    table.add_column("項目")
    table.add_column("件数", justify="right")
    table.add_row("承認待ち", str(len(waiting)))
    table.add_row("承認済み(未投稿)", str(len(approved)))
    table.add_row("投稿済み(累計)", str(len(published)))
    table.add_row("本日投稿済み(UTC)", str(len(published_today)))
    table.add_row("却下済み(累計)", str(len(rejected)))
    console.print(table)


@main.command("test-claude")
def cmd_test_claude() -> None:
    """Claude API への疎通確認。"""
    from anthropic import Anthropic

    settings = Settings.load()
    client = Anthropic(api_key=settings.anthropic_api_key)
    resp = client.messages.create(
        model=settings.anthropic_model,
        max_tokens=20,
        messages=[{"role": "user", "content": "「OK」と一言だけ返して"}],
    )
    console.print(f"[green]✅ Claude API 接続OK[/green] (model={settings.anthropic_model})")
    console.print(f"応答: {resp.content[0].text.strip()}")


@main.command("test-x")
def cmd_test_x() -> None:
    """X API への疎通確認。"""
    from src.publisher import Publisher

    pub = Publisher()
    username = pub.verify()
    console.print(f"[green]✅ X API 接続OK[/green] (@{username})")


if __name__ == "__main__":
    try:
        main()
    except RuntimeError as e:
        console.print(f"[red]{e}[/red]")
        sys.exit(1)
