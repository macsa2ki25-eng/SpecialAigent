"""Instagramカルーセル用の画像を生成する。

Pillowで1080x1080のスライド画像を5枚生成し、PNGで保存する。
パステル基調のママ層向けデザイン (淡いピンク/ベージュ、手書き風フォント)。

slides[i] のスキーマ:
  - {"type": "hook", "title": "...", "subtitle": "..."}
  - {"type": "content", "heading": "...", "body": "..."}
  - {"type": "outro", "title": "...", "subtitle": "..."}
"""

from __future__ import annotations

import textwrap
from dataclasses import dataclass
from pathlib import Path

import requests
from PIL import Image, ImageDraw, ImageFilter, ImageFont

from src.config import FONT_DIR, INSTAGRAM_IMAGES_DIR

# Yusei Magic (OFL ライセンス, Google Fonts) - 手書き風日本語フォント
FONT_URL = "https://github.com/google/fonts/raw/main/ofl/yuseimagic/YuseiMagic-Regular.ttf"
FONT_FILE = FONT_DIR / "YuseiMagic-Regular.ttf"

CANVAS_SIZE = (1080, 1080)
PADDING = 80
CARD_PADDING = 60

# パステルカラーパレット (RGB)
COLOR_BG_GRADIENT_TOP = (255, 234, 232)      # 淡いピーチ
COLOR_BG_GRADIENT_BOTTOM = (252, 222, 214)   # サーモン寄り
COLOR_CARD = (255, 250, 245)                 # ほぼ白のクリーム
COLOR_TEXT_DARK = (74, 60, 56)               # 黒に近い茶
COLOR_TEXT_ACCENT = (208, 95, 95)            # サンゴ
COLOR_TEXT_SOFT = (146, 117, 109)            # ベージュ
COLOR_DOT = (224, 174, 167)                  # ページャドット


def ensure_font() -> Path:
    """フォントが無ければGoogle Fontsからダウンロード."""
    if FONT_FILE.exists():
        return FONT_FILE
    FONT_FILE.parent.mkdir(parents=True, exist_ok=True)
    r = requests.get(FONT_URL, timeout=30)
    r.raise_for_status()
    FONT_FILE.write_bytes(r.content)
    return FONT_FILE


@dataclass
class FontSet:
    title_xl: ImageFont.FreeTypeFont
    title_lg: ImageFont.FreeTypeFont
    body: ImageFont.FreeTypeFont
    caption: ImageFont.FreeTypeFont
    page: ImageFont.FreeTypeFont

    @classmethod
    def load(cls) -> "FontSet":
        path = str(ensure_font())
        return cls(
            title_xl=ImageFont.truetype(path, 92),
            title_lg=ImageFont.truetype(path, 64),
            body=ImageFont.truetype(path, 46),
            caption=ImageFont.truetype(path, 34),
            page=ImageFont.truetype(path, 28),
        )


class CarouselGenerator:
    def __init__(self) -> None:
        INSTAGRAM_IMAGES_DIR.mkdir(parents=True, exist_ok=True)
        self.fonts = FontSet.load()

    def generate(self, post_id: str, slides: list[dict]) -> list[Path]:
        """全スライドを生成して PNG ファイルパスのリストを返す."""
        paths: list[Path] = []
        for idx, slide in enumerate(slides):
            img = self._render(slide, idx, len(slides))
            path = INSTAGRAM_IMAGES_DIR / f"{post_id}_{idx + 1}.png"
            img.save(path, "PNG", optimize=True)
            paths.append(path)
        return paths

    # --- レンダリング ---

    def _render(self, slide: dict, idx: int, total: int) -> Image.Image:
        img = self._make_gradient_bg()
        draw = ImageDraw.Draw(img)

        slide_type = slide.get("type", "content")
        if slide_type == "hook":
            self._draw_hook(draw, img, slide)
        elif slide_type == "outro":
            self._draw_outro(draw, img, slide)
        else:
            self._draw_content(draw, img, slide, idx, total)

        # 共通: 右下にページャドット
        self._draw_pager(draw, idx, total)
        return img

    def _make_gradient_bg(self) -> Image.Image:
        """縦方向のソフトグラデーション."""
        w, h = CANVAS_SIZE
        img = Image.new("RGB", CANVAS_SIZE, COLOR_BG_GRADIENT_TOP)
        top = COLOR_BG_GRADIENT_TOP
        bot = COLOR_BG_GRADIENT_BOTTOM
        pixels = img.load()
        for y in range(h):
            t = y / (h - 1)
            r = int(top[0] + (bot[0] - top[0]) * t)
            g = int(top[1] + (bot[1] - top[1]) * t)
            b = int(top[2] + (bot[2] - top[2]) * t)
            for x in range(w):
                pixels[x, y] = (r, g, b)
        # 軽いブラーを足してさらにふんわり感
        img = img.filter(ImageFilter.GaussianBlur(radius=1))
        return img

    def _draw_hook(self, draw: ImageDraw.ImageDraw, img: Image.Image, slide: dict) -> None:
        title = slide.get("title", "")
        subtitle = slide.get("subtitle", "")

        title_lines = self._wrap(title, max_chars=12)
        subtitle_lines = self._wrap(subtitle, max_chars=18)

        # タイトル
        line_h = 110
        total_h = len(title_lines) * line_h + (40 + len(subtitle_lines) * 50 if subtitle else 0)
        y = (CANVAS_SIZE[1] - total_h) // 2
        for line in title_lines:
            self._draw_centered(
                draw, line, y, self.fonts.title_xl, COLOR_TEXT_DARK
            )
            y += line_h
        if subtitle:
            y += 20
            for line in subtitle_lines:
                self._draw_centered(
                    draw, line, y, self.fonts.body, COLOR_TEXT_ACCENT
                )
                y += 50

    def _draw_content(
        self, draw: ImageDraw.ImageDraw, img: Image.Image, slide: dict, idx: int, total: int
    ) -> None:
        # 白いカードをほぼ全面に置く
        card_box = (PADDING, PADDING + 60, CANVAS_SIZE[0] - PADDING, CANVAS_SIZE[1] - PADDING - 60)
        self._draw_rounded_rect(img, card_box, COLOR_CARD, radius=48)

        heading = slide.get("heading", "")
        body = slide.get("body", "")

        # 番号バッジ (左上)
        badge_text = f"{idx}"
        badge_size = 100
        badge_x = card_box[0] + 60
        badge_y = card_box[1] + 60
        # 円
        draw.ellipse(
            [badge_x, badge_y, badge_x + badge_size, badge_y + badge_size],
            fill=COLOR_TEXT_ACCENT,
        )
        # 番号テキスト中央
        bbox = draw.textbbox((0, 0), badge_text, font=self.fonts.title_lg)
        bw = bbox[2] - bbox[0]
        bh = bbox[3] - bbox[1]
        draw.text(
            (badge_x + (badge_size - bw) // 2 - bbox[0],
             badge_y + (badge_size - bh) // 2 - bbox[1]),
            badge_text, font=self.fonts.title_lg, fill=(255, 255, 255),
        )

        # 見出し
        heading_lines = self._wrap(heading, max_chars=14)
        y = badge_y + badge_size + 50
        for line in heading_lines:
            draw.text(
                (card_box[0] + 60, y),
                line, font=self.fonts.title_lg, fill=COLOR_TEXT_DARK,
            )
            y += 80

        # 本文
        y += 30
        body_lines = self._wrap(body, max_chars=18)
        for line in body_lines:
            draw.text(
                (card_box[0] + 60, y),
                line, font=self.fonts.body, fill=COLOR_TEXT_SOFT,
            )
            y += 64

    def _draw_outro(self, draw: ImageDraw.ImageDraw, img: Image.Image, slide: dict) -> None:
        title = slide.get("title", "")
        subtitle = slide.get("subtitle", "")

        title_lines = self._wrap(title, max_chars=12)
        sub_lines = self._wrap(subtitle, max_chars=20)

        line_h = 96
        sub_h = 50
        total_h = len(title_lines) * line_h + 40 + len(sub_lines) * sub_h
        y = (CANVAS_SIZE[1] - total_h) // 2

        for line in title_lines:
            self._draw_centered(draw, line, y, self.fonts.title_lg, COLOR_TEXT_DARK)
            y += line_h
        y += 40
        for line in sub_lines:
            self._draw_centered(draw, line, y, self.fonts.caption, COLOR_TEXT_SOFT)
            y += sub_h

    def _draw_pager(self, draw: ImageDraw.ImageDraw, idx: int, total: int) -> None:
        """右下に '2/5' のような文字 + ドット表示."""
        text = f"{idx + 1} / {total}"
        bbox = draw.textbbox((0, 0), text, font=self.fonts.page)
        w = bbox[2] - bbox[0]
        h = bbox[3] - bbox[1]
        draw.text(
            (CANVAS_SIZE[0] - PADDING - w, CANVAS_SIZE[1] - PADDING - h - 4),
            text, font=self.fonts.page, fill=COLOR_TEXT_SOFT,
        )

    # --- ユーティリティ ---

    def _draw_centered(
        self,
        draw: ImageDraw.ImageDraw,
        text: str,
        y: int,
        font: ImageFont.FreeTypeFont,
        color: tuple,
    ) -> None:
        bbox = draw.textbbox((0, 0), text, font=font)
        w = bbox[2] - bbox[0]
        x = (CANVAS_SIZE[0] - w) // 2 - bbox[0]
        draw.text((x, y), text, font=font, fill=color)

    def _draw_rounded_rect(
        self, img: Image.Image, box: tuple, fill: tuple, radius: int = 32
    ) -> None:
        overlay = Image.new("RGBA", CANVAS_SIZE, (0, 0, 0, 0))
        odraw = ImageDraw.Draw(overlay)
        odraw.rounded_rectangle(box, radius=radius, fill=fill + (255,))
        img.paste(overlay, (0, 0), overlay)

    def _wrap(self, text: str, *, max_chars: int) -> list[str]:
        """日本語テキストを max_chars 文字単位で改行."""
        if not text:
            return [""]
        # 既存の改行を尊重しつつ、長い行は折り返す
        out: list[str] = []
        for raw_line in text.splitlines():
            if not raw_line:
                continue
            # 全角は1文字としてカウント (max_charsは全角基準)
            line = ""
            for ch in raw_line:
                line += ch
                if len(line) >= max_chars:
                    out.append(line)
                    line = ""
            if line:
                out.append(line)
        return out or [""]
