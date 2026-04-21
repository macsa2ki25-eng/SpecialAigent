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

load_dotenv(ROOT / ".env")


@dataclass
class Settings:
    anthropic_api_key: str
    anthropic_model: str
    x_api_key: str
    x_api_secret: str
    x_access_token: str
    x_access_token_secret: str
    x_username: str
    max_posts_per_day: int
    require_approval: bool

    @classmethod
    def load(cls) -> "Settings":
        def req(key: str) -> str:
            value = os.getenv(key, "").strip()
            if not value or value.startswith("xxx"):
                raise RuntimeError(
                    f"{key} が .env に設定されていません。.env.example をコピーして埋めてください。"
                )
            return value

        return cls(
            anthropic_api_key=req("ANTHROPIC_API_KEY"),
            anthropic_model=os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-6"),
            x_api_key=req("X_API_KEY"),
            x_api_secret=req("X_API_SECRET"),
            x_access_token=req("X_ACCESS_TOKEN"),
            x_access_token_secret=req("X_ACCESS_TOKEN_SECRET"),
            x_username=os.getenv("X_USERNAME", "unknown"),
            max_posts_per_day=int(os.getenv("MAX_POSTS_PER_DAY", "10")),
            require_approval=os.getenv("REQUIRE_APPROVAL", "true").lower() == "true",
        )


def load_viral_patterns() -> list[dict]:
    with (TEMPLATES_DIR / "viral_patterns.yaml").open(encoding="utf-8") as f:
        return yaml.safe_load(f)["patterns"]


def load_topics() -> dict:
    with (TEMPLATES_DIR / "topics.yaml").open(encoding="utf-8") as f:
        return yaml.safe_load(f)


def ensure_dirs() -> None:
    for d in (PENDING_DIR, PUBLISHED_DIR, REJECTED_DIR):
        d.mkdir(parents=True, exist_ok=True)
