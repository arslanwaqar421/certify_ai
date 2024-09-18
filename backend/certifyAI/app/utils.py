from django.conf import settings
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
from django.core.files import File
import os
import random
from datetime import datetime


def generate_certificate(name, certification):
    base_image_path = os.path.join(settings.MEDIA_ROOT, 'certificates', 'Certificate.png')
    font_path = os.path.join(settings.MEDIA_ROOT, 'fonts', 'font.ttf')

    if not os.path.exists(base_image_path):
        raise FileNotFoundError(f"Base certificate image not found at {base_image_path}")

    img = Image.open(base_image_path)
    d = ImageDraw.Draw(img)

    location = (143, 155)
    text_color = (100, 100, 100)
    font = ImageFont.truetype(font_path, 40)
    d.text(location, name, fill=text_color, font=font)

    location = (360, 215)
    font = ImageFont.truetype(font_path, 18)
    d.text(location, certification, fill=text_color, font=font)

    location = (200, 310)
    font = ImageFont.truetype(font_path, 15)
    d.text(location,datetime.today().strftime('%Y-%m-%d'), fill=text_color, font=font)

    file_name = f"{name.split(' ')[0]}_{random.randint(0, 255)}.png"
    file_stream = BytesIO()
    img.save(file_stream, format='PNG')
    file_stream.seek(0)

    django_file = File(file_stream, name=file_name)

    return django_file
