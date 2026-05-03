"""SpecialAigent の統合 CLI。

商品ベースの X投稿 + ブログ記事を生成・承認・公開する。

主要コマンド:
    python -m src.cli products              # products.yaml の一覧表示
    python -m src.cli generate --product <id> --x      # X投稿を1つ生成
    python -m src.cli generate --product <id> --blog   # ブログ記事を1つ生成
    python -m src.cli generate --product <id> --all    # X+ブログをまとめて生成
    python -m src.cli generate --auto --x --count 3    # 未投稿商品から自動でX×3生成
    python -m src.cli review                # 承認キューを対話レビュー
    python -m src.cli publish --target x    # 承認済みX投稿を公開
    python -m src.cli publish --target blog # 承認済みブログ投稿を公開
    python -m src.cli publish --target all  # X + ブログ両方公開
    python -m src.cli status                # キュー状態
    python -m src.cli test-claude / test-x / test-rakuten / test-hatena
"""

from __future__ import annotations

import json
import sys
from datetime import datetime, timezone

import click
from rich.console import Console
from rich.table import Table

from src.config import (
    PENDING_DIR,
    PUBLISHED_DIR,
    REJECTED_DIR,
    Settings,
    ensure_dirs,
    load_products,
    load_story_topics,
)

console = Console()


@click.group()
def main() -> None:
    """SpecialAigent: 商品レビュー × X × ブログ 自動化エージェント"""
    ensure_dirs()


# ============================================================
# products
# ============================================================


@main.command("topics")
def cmd_topics() -> None:
    """data/story_topics.yaml に登録された教育系ストーリーのネタ一覧."""
    topics = load_story_topics()
    if not topics:
        console.print("[yellow]ストーリーのネタが登録されていません。data/story_topics.yaml を編集してください。[/yellow]")
        return
    table = Table(title="教育系ストーリー ネタ帳")
    table.add_column("ID")
    table.add_column("タイトル")
    table.add_column("カテゴリ")
    table.add_column("難易度")
    for t in topics:
        table.add_row(
            t.get("id", ""),
            t.get("title", ""),
            t.get("category", ""),
            t.get("difficulty", ""),
        )
    console.print(table)


@main.command("generate-thread")
@click.option("--topic", "topic_id", default=None, help="対象のネタID (story_topics.yaml)")
@click.option("--length", default=6, type=int, help="ツイート数 (5-6推奨)")
@click.option("--pattern", default=None, help="型ID (x_thread_patterns.yaml)")
def cmd_generate_thread(topic_id: str | None, length: int, pattern: str | None) -> None:
    """教育系ストーリーをXスレッドとして生成し承認キューに入れる."""
    from src.generator import Generator

    topics = load_story_topics()
    if not topics:
        console.print("[red]data/story_topics.yaml にネタが登録されていません。[/red]")
        sys.exit(1)

    if topic_id:
        target = next((t for t in topics if t.get("id") == topic_id), None)
        if not target:
            console.print(f"[red]ID '{topic_id}' のネタが見つかりません。[/red]")
            sys.exit(1)
    else:
        target = topics[0]

    console.print(
        f"[cyan]ネタ: {target['id']} ({target.get('title', '')}) / {length}ツイート構成[/cyan]"
    )

    gen = Generator()
    with console.status("[cyan]Claude API でスレッド生成中...[/cyan]"):
        post = gen.generate_x_thread(target, length=length, pattern_id=pattern)
        path = gen.save(post)

    over = sum(1 for t in post["tweets"] if t.get("over_limit"))
    msg = f"[green]✅ スレッド生成: {path.name}[/green] ({post['tweet_count']}ツイート)"
    if over:
        msg += f" [yellow]⚠️ 140字超過 {over}件あり、reviewで要修正[/yellow]"
    console.print(msg)
    console.print("\n次は [bold]python -m src.cli review[/bold] で確認してください。")


@main.command("products")
def cmd_products() -> None:
    """data/products.yaml に登録された商品の一覧を表示."""
    products = load_products()
    if not products:
        console.print("[yellow]商品が登録されていません。data/products.yaml を編集してください。[/yellow]")
        return
    table = Table(title="登録商品")
    table.add_column("ID")
    table.add_column("商品名")
    table.add_column("カテゴリ")
    table.add_column("X投稿済")
    table.add_column("ブログ投稿済")
    for p in products:
        table.add_row(
            p.get("id", ""),
            p.get("name", ""),
            p.get("category", ""),
            "✓" if p.get("posted_at_x") else "",
            "✓" if p.get("posted_at_blog") else "",
        )
    console.print(table)


# ============================================================
# generate
# ============================================================


@main.command("generate")
@click.option("--product", "product_id", default=None, help="対象の商品ID")
@click.option("--auto", is_flag=True, help="未投稿の商品から自動選択")
@click.option("--x", "make_x", is_flag=True, help="X投稿を生成")
@click.option("--blog", "make_blog", is_flag=True, help="ブログ記事を生成")
@click.option("--all", "make_all", is_flag=True, help="X + ブログ両方")
@click.option("--count", default=1, type=int, help="X投稿の生成数 (異なる型で)")
@click.option("--pattern", default=None, help="X/ブログの型ID")
def cmd_generate(
    product_id: str | None,
    auto: bool,
    make_x: bool,
    make_blog: bool,
    make_all: bool,
    count: int,
    pattern: str | None,
) -> None:
    """商品から X投稿 / ブログ記事 を生成し、承認キューに入れる."""
    from src.generator import Generator

    if not (make_x or make_blog or make_all):
        console.print("[red]--x / --blog / --all のいずれかを指定してください。[/red]")
        sys.exit(1)
    if make_all:
        make_x = True
        make_blog = True

    products = load_products()
    if not products:
        console.print("[red]data/products.yaml に商品が登録されていません。[/red]")
        sys.exit(1)

    target = _select_product(products, product_id, auto, want_blog=make_blog, want_x=make_x)
    if not target:
        console.print("[yellow]対象の商品が見つかりませんでした。[/yellow]")
        return

    console.print(f"[cyan]対象商品: {target['id']} ({target.get('name', '')})[/cyan]")

    gen = Generator()

    if make_blog:
        with console.status("[cyan]ブログ記事を生成中...[/cyan]"):
            post = gen.generate_blog_post(target, pattern_id=pattern)
            path = gen.save(post)
        console.print(f"[green]✅ ブログ生成: {path.name}[/green] (約{post['char_count']}字)")

    if make_x:
        with console.status(f"[cyan]X投稿を {count} 件生成中...[/cyan]"):
            for _ in range(count):
                post = gen.generate_x_post(target, pattern_id=pattern)
                path = gen.save(post)
                console.print(
                    f"[green]✅ X生成: {path.name}[/green] "
                    f"(型: {post['pattern_name']}, {post['char_count']}字)"
                )

    console.print("\n次は [bold]python -m src.cli review[/bold] で確認してください。")


def _select_product(
    products: list[dict],
    product_id: str | None,
    auto: bool,
    *,
    want_blog: bool,
    want_x: bool,
) -> dict | None:
    if product_id:
        for p in products:
            if p.get("id") == product_id:
                return p
        return None
    if auto:
        # 投稿していない商品を優先 (Xかブログのどちらかが未投稿のものから選ぶ)
        for p in products:
            if want_blog and not p.get("posted_at_blog"):
                return p
            if want_x and not p.get("posted_at_x"):
                return p
        return products[0]
    # 何も指定がなければ先頭
    return products[0]


# ============================================================
# review
# ============================================================


@main.command("review")
def cmd_review() -> None:
    """承認キューを1件ずつ対話でレビュー."""
    from src.queue import review_all

    counts = review_all()
    console.print(
        f"\n[bold]結果:[/bold] 承認 {counts['approved']} / "
        f"却下 {counts['rejected']} / スキップ {counts['skipped']}"
    )
    if counts["approved"]:
        console.print("次は [bold]python -m src.cli publish --target all[/bold] で投稿できます。")


# ============================================================
# publish
# ============================================================


@main.command("publish")
@click.option(
    "--target",
    type=click.Choice(["x", "blog", "all"]),
    default="all",
    help="公開先を選択",
)
@click.option("--limit", default=None, type=int, help="今回投稿する件数の上限")
@click.option("--dry-run", is_flag=True, help="実際には投稿せず内容だけ表示")
def cmd_publish(target: str, limit: int | None, dry_run: bool) -> None:
    """承認済みの投稿を公開."""
    from src.queue import list_approved

    settings = Settings.load()

    if target in ("x", "all"):
        x_paths = list_approved(post_type="x")
        cap = limit or settings.max_posts_per_day
        _publish_x(x_paths[:cap], settings, dry_run=dry_run)

    if target in ("blog", "all"):
        blog_paths = list_approved(post_type="blog")
        cap = limit or settings.max_blog_posts_per_day
        _publish_blog(blog_paths[:cap], settings, dry_run=dry_run)


def _publish_x(paths: list, settings: Settings, *, dry_run: bool) -> None:
    if not paths:
        console.print("[yellow]承認済みのX投稿はありません。[/yellow]")
        return
    console.print(f"[cyan]X投稿 {len(paths)} 件を公開します[/cyan]")

    if dry_run:
        for p in paths:
            post = json.loads(p.read_text(encoding="utf-8"))
            ptype = post.get("type", "x")
            if ptype == "x_thread":
                console.rule(f"スレッド: {post.get('topic_title', '?')}")
                for i, t in enumerate(post.get("tweets", []), start=1):
                    console.print(f"[bold]\\[{i}][/bold] {t.get('text', '')}\n")
            else:
                console.rule(post.get("pattern_name", "?"))
                console.print(post.get("text", ""))
                if post.get("reply_text"):
                    console.print(f"[dim]リプ: {post['reply_text']}[/dim]")
        console.print("[dim](dry-run のため未送信)[/dim]")
        return

    from src.publisher import XPublisher

    pub = XPublisher(settings)
    success, failure = 0, 0
    for p in paths:
        post = json.loads(p.read_text(encoding="utf-8"))
        ptype = post.get("type", "x")
        try:
            if ptype == "x_thread":
                result = pub.publish_thread_from_file(p)
                first_url = result["tweet_results"][0]["url"]
                console.print(
                    f"[green]✅ Xスレッド[/green] ({len(result['tweet_results'])}ツイート) {first_url}"
                )
            else:
                result = pub.publish_from_file(p)
                console.print(f"[green]✅ X投稿[/green] {result['main']['url']}")
            success += 1
        except Exception as e:  # noqa: BLE001
            console.print(f"[red]❌ X失敗 {p.name}: {e}[/red]")
            failure += 1
    console.print(f"[bold]X結果:[/bold] 成功 {success} / 失敗 {failure}")


def _publish_blog(paths: list, settings: Settings, *, dry_run: bool) -> None:
    if not paths:
        console.print("[yellow]承認済みのブログ記事はありません。[/yellow]")
        return
    console.print(f"[cyan]ブログ {len(paths)} 件を公開します[/cyan]")

    if dry_run:
        for p in paths:
            post = json.loads(p.read_text(encoding="utf-8"))
            console.rule(post.get("title", "?"))
            console.print(post.get("body_markdown", "")[:500] + "...")
        console.print("[dim](dry-run のため未送信)[/dim]")
        return

    from src.publisher import HatenaPublisher

    pub = HatenaPublisher(settings)
    success, failure = 0, 0
    for p in paths:
        try:
            result = pub.publish_from_file(p)
            console.print(f"[green]✅ ブログ投稿[/green] {result['entry']['url']}")
            success += 1
        except Exception as e:  # noqa: BLE001
            console.print(f"[red]❌ ブログ失敗 {p.name}: {e}[/red]")
            failure += 1
    console.print(f"[bold]ブログ結果:[/bold] 成功 {success} / 失敗 {failure}")


# ============================================================
# status
# ============================================================


@main.command("status")
def cmd_status() -> None:
    """キューの状態を表示."""
    pending_paths = list(PENDING_DIR.glob("*.json"))
    approved = []
    waiting = []
    for p in pending_paths:
        d = json.loads(p.read_text(encoding="utf-8"))
        (approved if d.get("status") == "approved" else waiting).append(p)

    published = list(PUBLISHED_DIR.glob("*.json"))
    rejected = list(REJECTED_DIR.glob("*.json"))
    today = datetime.now(timezone.utc).strftime("%Y%m%d")
    today_pub = [p for p in published if p.name.startswith(today)]

    table = Table(title="SpecialAigent ステータス")
    table.add_column("項目")
    table.add_column("件数", justify="right")
    table.add_row("承認待ち", str(len(waiting)))
    table.add_row("承認済み(未投稿)", str(len(approved)))
    table.add_row("投稿済み(累計)", str(len(published)))
    table.add_row("本日投稿済み(UTC)", str(len(today_pub)))
    table.add_row("却下済み(累計)", str(len(rejected)))
    console.print(table)


# ============================================================
# tests
# ============================================================


@main.command("test-claude")
def cmd_test_claude() -> None:
    """Claude API への疎通確認."""
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
    """X API への疎通確認."""
    from src.publisher import XPublisher

    pub = XPublisher()
    username = pub.verify()
    console.print(f"[green]✅ X API 接続OK[/green] (@{username})")


@main.command("test-rakuten")
@click.option("--query", default="ネコソギ 顆粒 除草剤", help="検索クエリ")
def cmd_test_rakuten(query: str) -> None:
    """楽天APIへの疎通確認."""
    from src.affiliate import RakutenClient

    client = RakutenClient()
    item = client.search_top_item(query)
    if not item:
        console.print(f"[yellow]ヒットなし: {query}[/yellow]")
        return
    console.print(f"[green]✅ 楽天API 接続OK[/green]")
    console.print(f"商品: {item.name}")
    console.print(f"価格: {item.price}円")
    console.print(f"アフィリURL: {item.affiliate_url}")


@main.command("test-hatena")
def cmd_test_hatena() -> None:
    """はてなブログAPIへの疎通確認."""
    from src.publisher import HatenaPublisher

    pub = HatenaPublisher()
    domain = pub.verify()
    console.print(f"[green]✅ はてなブログAPI 接続OK[/green] ({domain})")


if __name__ == "__main__":
    try:
        main()
    except RuntimeError as e:
        console.print(f"[red]{e}[/red]")
        sys.exit(1)
