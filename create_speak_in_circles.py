"""
Speak in Circles - Speaking Activity PowerPoint Generator
For high school English classes (CEFR A1-A2)
"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
import math

# ── Slide dimensions (16:9) ──
SLIDE_WIDTH = Inches(13.333)
SLIDE_HEIGHT = Inches(7.5)

# ── Colors ──
TEAL = RGBColor(0x00, 0xB4, 0xD8)
PINK = RGBColor(0xFF, 0x6B, 0x8A)
LIGHT_BLUE = RGBColor(0x87, 0xCE, 0xEB)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
BLACK = RGBColor(0x00, 0x00, 0x00)
DARK_GRAY = RGBColor(0x33, 0x33, 0x33)
RED = RGBColor(0xFF, 0x00, 0x00)
BLUE_ACCENT = RGBColor(0x00, 0x7A, 0xCC)
RED_ACCENT = RGBColor(0xFF, 0x44, 0x44)
BG_LIGHT = RGBColor(0xF0, 0xF8, 0xFF)
NAVY = RGBColor(0x1A, 0x23, 0x5B)
GOLD = RGBColor(0xFF, 0xD7, 0x00)


def set_slide_bg(slide, color):
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = color


def add_rounded_rect(slide, left, top, width, height, fill_color, border_color=None, border_width=Pt(2)):
    shape = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height
    )
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = border_width
    else:
        shape.line.fill.background()
    return shape


def add_text_box(slide, left, top, width, height, text, font_size=18,
                 bold=False, color=BLACK, alignment=PP_ALIGN.LEFT,
                 font_name="Calibri", anchor=MSO_ANCHOR.MIDDLE):
    txBox = slide.shapes.add_textbox(left, top, width, height)
    tf = txBox.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text
    p.font.size = Pt(font_size)
    p.font.bold = bold
    p.font.color.rgb = color
    p.font.name = font_name
    p.alignment = alignment
    tf.vertical_anchor = anchor
    return txBox


def add_title_bar(slide, set_number):
    """Add the SPEAK in CIRCLES title bar at top."""
    bar = add_rounded_rect(
        slide, Inches(0.3), Inches(0.2), Inches(3.5), Inches(0.7),
        TEAL, border_color=WHITE, border_width=Pt(3)
    )
    tf = bar.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run = p.add_run()
    run.text = f"SPEAK in CIRCLES"
    run.font.size = Pt(20)
    run.font.bold = True
    run.font.color.rgb = WHITE
    run.font.name = "Calibri"

    # Set number badge
    badge = add_rounded_rect(
        slide, Inches(4.0), Inches(0.2), Inches(0.9), Inches(0.7),
        NAVY, border_color=WHITE, border_width=Pt(2)
    )
    tf2 = badge.text_frame
    p2 = tf2.paragraphs[0]
    p2.alignment = PP_ALIGN.CENTER
    run2 = p2.add_run()
    run2.text = f"#{set_number}"
    run2.font.size = Pt(22)
    run2.font.bold = True
    run2.font.color.rgb = WHITE
    run2.font.name = "Calibri"


def create_title_slide(prs):
    """Create the title/instructions slide."""
    slide = prs.slides.add_slide(prs.slide_layouts[6])  # Blank layout
    set_slide_bg(slide, BG_LIGHT)

    # Main title
    add_text_box(slide, Inches(1.5), Inches(0.5), Inches(10), Inches(1.5),
                 "SPEAK in CIRCLES", font_size=54, bold=True, color=TEAL,
                 alignment=PP_ALIGN.CENTER, font_name="Calibri")

    # Subtitle
    add_text_box(slide, Inches(2), Inches(1.8), Inches(9), Inches(0.6),
                 "Say it without saying it!", font_size=28, bold=False,
                 color=PINK, alignment=PP_ALIGN.CENTER, font_name="Calibri")

    # Decorative line
    line = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, Inches(3), Inches(2.5), Inches(7), Pt(3)
    )
    line.fill.solid()
    line.fill.fore_color.rgb = TEAL
    line.line.fill.background()

    # Instructions box
    instr_box = add_rounded_rect(
        slide, Inches(1.5), Inches(2.8), Inches(10), Inches(4.2),
        WHITE, border_color=TEAL, border_width=Pt(3)
    )

    # Step 1
    step1_badge = add_rounded_rect(
        slide, Inches(1.8), Inches(3.1), Inches(0.7), Inches(0.7),
        TEAL
    )
    tf = step1_badge.text_frame
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run = p.add_run()
    run.text = "1"
    run.font.size = Pt(28)
    run.font.bold = True
    run.font.color.rgb = WHITE

    add_text_box(slide, Inches(2.8), Inches(3.0), Inches(8), Inches(0.9),
                 "Student A sees the picture and memorizes the object.\nStudent B closes their eyes.",
                 font_size=18, color=DARK_GRAY, alignment=PP_ALIGN.LEFT)

    # Step 2
    step2_badge = add_rounded_rect(
        slide, Inches(1.8), Inches(4.1), Inches(0.7), Inches(0.7),
        PINK
    )
    tf = step2_badge.text_frame
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run = p.add_run()
    run.text = "2"
    run.font.size = Pt(28)
    run.font.bold = True
    run.font.color.rgb = WHITE

    add_text_box(slide, Inches(2.8), Inches(4.0), Inches(8), Inches(0.9),
                 "Student B opens their eyes.\nStudent A gives hints without saying the name.",
                 font_size=18, color=DARK_GRAY, alignment=PP_ALIGN.LEFT)

    # Step 3
    step3_badge = add_rounded_rect(
        slide, Inches(1.8), Inches(5.2), Inches(0.7), Inches(0.7),
        LIGHT_BLUE
    )
    tf = step3_badge.text_frame
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run = p.add_run()
    run.text = "3"
    run.font.size = Pt(28)
    run.font.bold = True
    run.font.color.rgb = WHITE

    add_text_box(slide, Inches(2.8), Inches(5.1), Inches(8), Inches(0.9),
                 "Choices appear.\nIf Student B picks the right one — Mission Complete!",
                 font_size=18, color=DARK_GRAY, alignment=PP_ALIGN.LEFT)

    # Footer
    add_text_box(slide, Inches(2), Inches(6.5), Inches(9), Inches(0.5),
                 "Speaking Activity  |  CEFR A1–A2  |  10 Sets",
                 font_size=14, color=TEAL, alignment=PP_ALIGN.CENTER)


def create_photo_slide(prs, set_number, item_name, photo_description):
    """Create the photo slide with description text (no actual photo)."""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_bg(slide, BG_LIGHT)
    add_title_bar(slide, set_number)

    # Phase indicator
    phase_box = add_rounded_rect(
        slide, Inches(9.5), Inches(0.2), Inches(3.5), Inches(0.7),
        PINK
    )
    tf = phase_box.text_frame
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run = p.add_run()
    run.text = "👀 Student A: Look & Memorize!"
    run.font.size = Pt(16)
    run.font.bold = True
    run.font.color.rgb = WHITE

    # Large photo placeholder area
    photo_area = add_rounded_rect(
        slide, Inches(1.5), Inches(1.3), Inches(10.3), Inches(5.2),
        WHITE, border_color=TEAL, border_width=Pt(4)
    )

    # Photo description (since we can't embed actual photos)
    add_text_box(slide, Inches(2), Inches(1.8), Inches(9.3), Inches(1.0),
                 f"📷 Photo: {photo_description}",
                 font_size=24, bold=True, color=DARK_GRAY,
                 alignment=PP_ALIGN.CENTER)

    # Large icon/emoji representation
    add_text_box(slide, Inches(3), Inches(2.8), Inches(7), Inches(2.5),
                 get_emoji_for_item(item_name),
                 font_size=120, bold=False, color=BLACK,
                 alignment=PP_ALIGN.CENTER)

    # Instruction text
    add_text_box(slide, Inches(2), Inches(5.5), Inches(9), Inches(0.8),
                 "Student B: Please close your eyes!",
                 font_size=20, bold=True, color=PINK,
                 alignment=PP_ALIGN.CENTER)

    # Timer hint
    timer_badge = add_rounded_rect(
        slide, Inches(10.5), Inches(5.8), Inches(1.5), Inches(0.8),
        NAVY
    )
    tf = timer_badge.text_frame
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run = p.add_run()
    run.text = "7 sec"
    run.font.size = Pt(20)
    run.font.bold = True
    run.font.color.rgb = WHITE


def create_choices_slide(prs, set_number, correct_answer, choice_a, choice_b, choice_c):
    """Create the 3-choice slide."""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_bg(slide, BG_LIGHT)
    add_title_bar(slide, set_number)

    # Phase indicator
    phase_box = add_rounded_rect(
        slide, Inches(9.5), Inches(0.2), Inches(3.5), Inches(0.7),
        TEAL
    )
    tf = phase_box.text_frame
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run = p.add_run()
    run.text = "🤔 Student B: Choose the answer!"
    run.font.size = Pt(16)
    run.font.bold = True
    run.font.color.rgb = WHITE

    choices = [
        ("A", choice_a, TEAL),
        ("B", choice_b, PINK),
        ("C", choice_c, LIGHT_BLUE),
    ]

    y_start = Inches(1.5)
    for i, (letter, text, color) in enumerate(choices):
        y = y_start + Inches(i * 1.8)

        # Choice button
        btn = add_rounded_rect(
            slide, Inches(2), y, Inches(9), Inches(1.4),
            color, border_color=WHITE, border_width=Pt(4)
        )

        # Letter badge
        letter_box = add_rounded_rect(
            slide, Inches(2.3), y + Inches(0.2), Inches(1.0), Inches(1.0),
            WHITE, border_color=WHITE, border_width=Pt(2)
        )
        tf = letter_box.text_frame
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        run = p.add_run()
        run.text = letter
        run.font.size = Pt(36)
        run.font.bold = True
        run.font.color.rgb = color

        # Choice text
        add_text_box(slide, Inches(3.8), y, Inches(6.5), Inches(1.4),
                     text, font_size=40, bold=True, color=WHITE,
                     alignment=PP_ALIGN.CENTER)

    # Note at bottom
    add_text_box(slide, Inches(2), Inches(6.8), Inches(9), Inches(0.5),
                 f"✅ Correct Answer: {correct_answer}",
                 font_size=14, bold=False, color=RGBColor(0x99, 0x99, 0x99),
                 alignment=PP_ALIGN.RIGHT)


def create_model_slide(prs, set_number, item_name, vocab_list, model_sentence, grammar_point=""):
    """Create the model description slide."""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_bg(slide, BG_LIGHT)
    add_title_bar(slide, set_number)

    # Phase indicator
    phase_box = add_rounded_rect(
        slide, Inches(7), Inches(0.2), Inches(6), Inches(0.7),
        GOLD
    )
    tf = phase_box.text_frame
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run = p.add_run()
    run.text = "⭐ Model Description"
    run.font.size = Pt(18)
    run.font.bold = True
    run.font.color.rgb = DARK_GRAY

    # Grammar / Vocabulary box
    vocab_box = add_rounded_rect(
        slide, Inches(0.5), Inches(1.2), Inches(12.3), Inches(2.8),
        WHITE, border_color=DARK_GRAY, border_width=Pt(2)
    )

    # Grammar/Vocabulary header
    header_box = add_rounded_rect(
        slide, Inches(4.5), Inches(1.0), Inches(4.3), Inches(0.5),
        DARK_GRAY
    )
    tf = header_box.text_frame
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run = p.add_run()
    run.text = "Grammar / Vocabulary"
    run.font.size = Pt(16)
    run.font.bold = True
    run.font.color.rgb = WHITE

    # Answer label
    add_text_box(slide, Inches(1.0), Inches(1.6), Inches(4), Inches(0.6),
                 f"Answer: {item_name}",
                 font_size=22, bold=True, color=TEAL,
                 alignment=PP_ALIGN.LEFT)

    # Vocabulary items
    y_offset = Inches(2.2)
    colors = [BLUE_ACCENT, RED_ACCENT, TEAL, PINK]
    for i, vocab in enumerate(vocab_list):
        color = colors[i % len(colors)]
        # Bullet
        bullet = slide.shapes.add_shape(
            MSO_SHAPE.OVAL, Inches(1.2), y_offset + Inches(i * 0.5) + Inches(0.1),
            Inches(0.2), Inches(0.2)
        )
        bullet.fill.solid()
        bullet.fill.fore_color.rgb = color
        bullet.line.fill.background()

        add_text_box(slide, Inches(1.6), y_offset + Inches(i * 0.5), Inches(10), Inches(0.5),
                     vocab, font_size=18, bold=True, color=DARK_GRAY,
                     alignment=PP_ALIGN.LEFT)

    # Grammar point (if any)
    if grammar_point:
        gp_box = add_rounded_rect(
            slide, Inches(7), Inches(2.2), Inches(5.5), Inches(0.5),
            RGBColor(0xE8, 0xE8, 0xE8)
        )
        tf = gp_box.text_frame
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        run = p.add_run()
        run.text = f"📝 {grammar_point}"
        run.font.size = Pt(14)
        run.font.color.rgb = DARK_GRAY

    # Divider line
    divider = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(4.3), Inches(11.7), Pt(2)
    )
    divider.fill.solid()
    divider.fill.fore_color.rgb = RGBColor(0xCC, 0xCC, 0xCC)
    divider.line.fill.background()

    # Model sentence box
    sentence_box = add_rounded_rect(
        slide, Inches(0.5), Inches(4.6), Inches(12.3), Inches(2.5),
        WHITE, border_color=TEAL, border_width=Pt(3)
    )

    add_text_box(slide, Inches(1.0), Inches(4.8), Inches(11.3), Inches(2.0),
                 model_sentence,
                 font_size=28, bold=True, color=DARK_GRAY,
                 alignment=PP_ALIGN.CENTER, font_name="Calibri")


def get_emoji_for_item(item_name):
    """Return a relevant emoji for the item."""
    emoji_map = {
        "Bicycle": "🚲",
        "Umbrella": "☂️",
        "Piano": "🎹",
        "Sunglasses": "🕶️",
        "Pizza": "🍕",
        "Camera": "📷",
        "Clock": "🕐",
        "Backpack": "🎒",
        "Ice Cream": "🍦",
        "Airplane": "✈️",
    }
    return emoji_map.get(item_name, "❓")


def main():
    prs = Presentation()
    prs.slide_width = SLIDE_WIDTH
    prs.slide_height = SLIDE_HEIGHT

    # ── Activity Data: 10 Sets ──
    sets = [
        {
            "number": 1,
            "item": "Bicycle",
            "photo_desc": "A woman riding a bicycle on a city street near a brick bridge",
            "choices": ("Bicycle", "Car", "Scooter"),
            "correct": "A",
            "vocab": ["wheel — 車輪", "faster than walking — 歩くより早い（比較）"],
            "model": "It has two wheels. You move it with your legs and go faster than walking.",
            "grammar": "Comparative: faster than ~",
        },
        {
            "number": 2,
            "item": "Umbrella",
            "photo_desc": "A colorful umbrella on a rainy day in a city",
            "choices": ("Umbrella", "Hat", "Raincoat"),
            "correct": "A",
            "vocab": ["rain — 雨", "keep ~ dry — ～を乾いた状態に保つ"],
            "model": "You use it when it rains. You open it above your head to keep dry.",
            "grammar": "When + present tense",
        },
        {
            "number": 3,
            "item": "Piano",
            "photo_desc": "A grand piano in a concert hall with spotlight",
            "choices": ("Guitar", "Piano", "Drums"),
            "correct": "B",
            "vocab": ["keys — 鍵盤", "black and white — 白と黒"],
            "model": "It is a big musical instrument. It has black and white keys. You press them with your fingers.",
            "grammar": "Subject + have/has",
        },
        {
            "number": 4,
            "item": "Sunglasses",
            "photo_desc": "Stylish sunglasses on a sunny beach",
            "choices": ("Watch", "Sunglasses", "Earphones"),
            "correct": "B",
            "vocab": ["protect — 守る", "bright — まぶしい"],
            "model": "You wear them on your face. They protect your eyes from bright light on sunny days.",
            "grammar": "Plural: them/they",
        },
        {
            "number": 5,
            "item": "Pizza",
            "photo_desc": "A delicious cheese pizza with toppings on a wooden board",
            "choices": ("Sushi", "Hamburger", "Pizza"),
            "correct": "C",
            "vocab": ["round — 丸い", "slice — 一切れ"],
            "model": "It is round and you cut it into slices. It comes from Italy and has cheese on top.",
            "grammar": "Passive meaning: It comes from ~",
        },
        {
            "number": 6,
            "item": "Camera",
            "photo_desc": "A person taking a photo with a digital camera at a tourist spot",
            "choices": ("Camera", "Smartphone", "Telescope"),
            "correct": "A",
            "vocab": ["take a picture — 写真を撮る", "moment — 瞬間"],
            "model": "You use it to take pictures. You press a button and it saves the moment.",
            "grammar": "Infinitive: to + verb",
        },
        {
            "number": 7,
            "item": "Clock",
            "photo_desc": "A large clock on a wall showing the time",
            "choices": ("Calendar", "Clock", "Thermometer"),
            "correct": "B",
            "vocab": ["hands — 針", "tell the time — 時間を教える"],
            "model": "It is on the wall. It has numbers and hands. It tells you the time.",
            "grammar": "Subject + tell + object",
        },
        {
            "number": 8,
            "item": "Backpack",
            "photo_desc": "A student carrying a backpack at school",
            "choices": ("Suitcase", "Wallet", "Backpack"),
            "correct": "C",
            "vocab": ["carry — 運ぶ", "on your back — 背中に"],
            "model": "Students carry it on their back. You can put books and lunch inside it.",
            "grammar": "Can + verb (ability)",
        },
        {
            "number": 9,
            "item": "Ice Cream",
            "photo_desc": "A colorful ice cream cone with multiple scoops",
            "choices": ("Cake", "Ice Cream", "Chocolate"),
            "correct": "B",
            "vocab": ["cold — 冷たい", "melt — 溶ける"],
            "model": "It is very cold and sweet. It melts quickly in summer. You can choose many flavors.",
            "grammar": "Adverb: quickly",
        },
        {
            "number": 10,
            "item": "Airplane",
            "photo_desc": "An airplane flying high above the clouds in a blue sky",
            "choices": ("Airplane", "Helicopter", "Rocket"),
            "correct": "A",
            "vocab": ["fly — 飛ぶ", "wings — 翼"],
            "model": "It has wings and it can fly. It carries many people to different countries very fast.",
            "grammar": "Can + verb (ability)",
        },
    ]

    # ── Create Title Slide ──
    create_title_slide(prs)

    # ── Create 10 Sets (3 slides each) ──
    for s in sets:
        # Slide 1: Photo
        create_photo_slide(prs, s["number"], s["item"], s["photo_desc"])

        # Slide 2: Choices
        create_choices_slide(
            prs, s["number"], s["correct"],
            s["choices"][0], s["choices"][1], s["choices"][2]
        )

        # Slide 3: Model Description
        create_model_slide(
            prs, s["number"], s["item"],
            s["vocab"], s["model"], s["grammar"]
        )

    # ── Save ──
    output_path = "/home/user/SpecialAigent/Speak_in_Circles_Activity.pptx"
    prs.save(output_path)
    print(f"✅ PowerPoint saved to: {output_path}")
    print(f"📊 Total slides: {len(prs.slides)} (1 title + 10 sets × 3 slides)")


if __name__ == "__main__":
    main()
