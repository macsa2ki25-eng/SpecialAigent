"""環境変数と設定ファイルの読み込みを一元化する。"""

from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

import yaml
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
TEMPLATES_DIR = ROOT / "templates"

PENDING_DIR = DATA_DIR / "posts" / "pending"
PUBLISHED_DIR = DATA_DIR / "posts" / "published"
REJECTED_DIR = DATA_DIR / "posts" / "rejected"

PRODUCTS_FILE = DATA_DIR / "products.yaml"
BUZZ_EXAMPLES_FILE = DATA_DIR / "buzz_examples.yaml"
STORY_TOPICS_FILE = DATA_DIR / "story_topics.yaml"
CHIIKU_TOPICS_FILE = DATA_DIR / "chiiku_topics.yaml"

ASSETS_DIR = ROOT / "assets"
FONT_DIR = ASSETS_DIR / "fonts"
INSTAGRAM_IMAGES_DIR = DATA_DIR / "instagram_images"

load_dotenv(ROOT / ".env")


def _opt(key: str, default: str = "") -> str:
    return os.getenv(key, default).strip()


def _is_placeholder(value: str) -> bool:
    return not value or value.startswith("xxx") or value.startswith("your_")


@dataclass
class Settings:
    # Claude
    anthropic_api_key: str
    anthropic_model: str
    # X
    x_api_key: str
    x_api_secret: str
    x_access_token: str
    x_access_token_secret: str
    x_username: str
    # はてなブログ
    hatena_user_id: str
    hatena_blog_domain: str
    hatena_api_key: str
    # 楽天
    rakuten_application_id: str
    rakuten_affiliate_id: str
    # Amazon (任意)
    amazon_associate_tag: str
    # Instagram
    instagram_business_id: str
    instagram_access_token: str
    image_hosting: str
    imgbb_api_key: str
    github_repo_owner: str
    github_repo_name: str
    github_repo_branch: str
    # 運用
    max_posts_per_day: int
    max_blog_posts_per_day: int
    require_approval: bool

    @classmethod
    def load(cls) -> "Settings":
        def req(key: str) -> str:
            value = _opt(key)
            if _is_placeholder(value):
                raise RuntimeError(
                    f"{key} が .env に設定されていません。.env.example をコピーして埋めてください。"
                )
            return value

        return cls(
            anthropic_api_key=req("ANTHROPIC_API_KEY"),
            anthropic_model=_opt("ANTHROPIC_MODEL", "claude-sonnet-4-6"),
            x_api_key=req("X_API_KEY"),
            x_api_secret=req("X_API_SECRET"),
            x_access_token=req("X_ACCESS_TOKEN"),
            x_access_token_secret=req("X_ACCESS_TOKEN_SECRET"),
            x_username=_opt("X_USERNAME", "unknown"),
            hatena_user_id=_opt("HATENA_USER_ID"),
            hatena_blog_domain=_opt("HATENA_BLOG_DOMAIN"),
            hatena_api_key=_opt("HATENA_API_KEY"),
            rakuten_application_id=_opt("RAKUTEN_APPLICATION_ID"),
            rakuten_affiliate_id=_opt("RAKUTEN_AFFILIATE_ID"),
            amazon_associate_tag=_opt("AMAZON_ASSOCIATE_TAG"),
            instagram_business_id=_opt("INSTAGRAM_BUSINESS_ID"),
            instagram_access_token=_opt("INSTAGRAM_ACCESS_TOKEN"),
            image_hosting=_opt("IMAGE_HOSTING", "github_raw"),
            imgbb_api_key=_opt("IMGBB_API_KEY"),
            github_repo_owner=_opt("GITHUB_REPO_OWNER", "macsa2ki25-eng"),
            github_repo_name=_opt("GITHUB_REPO_NAME", "SpecialAigent"),
            github_repo_branch=_opt(
                "GITHUB_REPO_BRANCH", "claude/x-revenue-automation-MegUY"
            ),
            max_posts_per_day=int(_opt("MAX_POSTS_PER_DAY", "5")),
            max_blog_posts_per_day=int(_opt("MAX_BLOG_POSTS_PER_DAY", "2")),
            require_approval=_opt("REQUIRE_APPROVAL", "true").lower() == "true",
        )

    def has_rakuten(self) -> bool:
        return not _is_placeholder(self.rakuten_application_id) and not _is_placeholder(
            self.rakuten_affiliate_id
        )

    def has_hatena(self) -> bool:
        return all(
            not _is_placeholder(v)
            for v in (self.hatena_user_id, self.hatena_blog_domain, self.hatena_api_key)
        )

    def has_instagram(self) -> bool:
        return not _is_placeholder(self.instagram_business_id) and not _is_placeholder(
            self.instagram_access_token
        )


def load_x_patterns() -> list[dict]:
    with (TEMPLATES_DIR / "x_review_patterns.yaml").open(encoding="utf-8") as f:
        return yaml.safe_load(f)["patterns"]


def load_blog_patterns() -> list[dict]:
    with (TEMPLATES_DIR / "blog_patterns.yaml").open(encoding="utf-8") as f:
        return yaml.safe_load(f)["patterns"]


def load_thread_patterns() -> list[dict]:
    with (TEMPLATES_DIR / "x_thread_patterns.yaml").open(encoding="utf-8") as f:
        return yaml.safe_load(f)["patterns"]


def load_story_topics() -> list[dict]:
    if not STORY_TOPICS_FILE.exists():
        return []
    with STORY_TOPICS_FILE.open(encoding="utf-8") as f:
        data = yaml.safe_load(f) or {}
        return data.get("topics", [])


def load_chiiku_topics() -> list[dict]:
    if not CHIIKU_TOPICS_FILE.exists():
        return []
    with CHIIKU_TOPICS_FILE.open(encoding="utf-8") as f:
        data = yaml.safe_load(f) or {}
        return data.get("topics", [])


def save_chiiku_topics(topics: list[dict]) -> None:
    CHIIKU_TOPICS_FILE.parent.mkdir(parents=True, exist_ok=True)
    with CHIIKU_TOPICS_FILE.open("w", encoding="utf-8") as f:
        yaml.safe_dump(
            {"topics": topics},
            f,
            allow_unicode=True,
            sort_keys=False,
            default_flow_style=False,
        )


def load_chiiku_patterns() -> list[dict]:
    with (TEMPLATES_DIR / "chiiku_patterns.yaml").open(encoding="utf-8") as f:
        return yaml.safe_load(f)["patterns"]


def load_products() -> list[dict]:
    if not PRODUCTS_FILE.exists():
        return []
    with PRODUCTS_FILE.open(encoding="utf-8") as f:
        data = yaml.safe_load(f) or {}
        return data.get("products", [])


def load_buzz_examples() -> list[dict]:
    if not BUZZ_EXAMPLES_FILE.exists():
        return []
    with BUZZ_EXAMPLES_FILE.open(encoding="utf-8") as f:
        data = yaml.safe_load(f) or {}
        return data.get("examples", [])


def save_products(products: list[dict]) -> None:
    PRODUCTS_FILE.parent.mkdir(parents=True, exist_ok=True)
    with PRODUCTS_FILE.open("w", encoding="utf-8") as f:
        yaml.safe_dump(
            {"products": products},
            f,
            allow_unicode=True,
            sort_keys=False,
            default_flow_style=False,
        )


def ensure_dirs() -> None:
    for d in (PENDING_DIR, PUBLISHED_DIR, REJECTED_DIR):
        d.mkdir(parents=True, exist_ok=True)
