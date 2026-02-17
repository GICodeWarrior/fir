import os

from datetime import datetime
from random import Random
from sys import stderr

DATA_DIR = "quantities"
rand = Random()
rand.seed(5724042)

chances = [True, *([False] * 499)]

shifts = [
  ('noshift', ''),
  ('shifte', '-gravity east -splice 1x0 +repage -gravity center -crop {width}x{height}+1+0 +repage'),
  ('shiftw', '-gravity west -splice 1x0 +repage -gravity center -crop {width}x{height}-1+0 +repage'),
  ('shiftn', '-gravity north -splice 0x1 +repage -gravity center -crop {width}x{height}+0-1 +repage'),
  ('shifts', '-gravity south -splice 0x1 +repage -gravity center -crop {width}x{height}+0+1 +repage'),
  ('shiftse', '-gravity southeast -splice 1x1 +repage -gravity center -crop {width}x{height}+1+1 +repage'),
  ('shiftnw', '-gravity northwest -splice 1x1 +repage -gravity center -crop {width}x{height}-1-1 +repage'),
  ('shiftsw', '-gravity southwest -splice 1x1 +repage -gravity center -crop {width}x{height}-1+1 +repage'),
  ('shiftne', '-gravity northeast -splice 1x1 +repage -gravity center -crop {width}x{height}+1-1 +repage'),

  ('shift2e', '-gravity east -splice 2x0 +repage -gravity center -crop {width}x{height}+2+0 +repage'),
  ('shift2w', '-gravity west -splice 2x0 +repage -gravity center -crop {width}x{height}-2+0 +repage'),
  ('shift2n', '-gravity north -splice 0x2 +repage -gravity center -crop {width}x{height}+0-2 +repage'),
  ('shift2s', '-gravity south -splice 0x2 +repage -gravity center -crop {width}x{height}+0+2 +repage'),
  ('shift2se', '-gravity southeast -splice 2x2 +repage -gravity center -crop {width}x{height}+2+2 +repage'),
  ('shift2nw', '-gravity northwest -splice 2x2 +repage -gravity center -crop {width}x{height}-2-2 +repage'),
  ('shift2sw', '-gravity southwest -splice 2x2 +repage -gravity center -crop {width}x{height}-2+2 +repage'),
  ('shift2ne', '-gravity northeast -splice 2x2 +repage -gravity center -crop {width}x{height}+2-2 +repage'),
]

smears = [
  ('nosmear', ''),
  ('smearh', "-resize '{width}x{height_plus}!'"),
  ('smearw', "-resize '{width_plus}x{height}!'"),
  ('smearwh', "-resize '{width_plus}x{height_plus}!'"),

  ('smear2h', "-resize '{width}x{height_plus_plus}!'"),
  ('smear2w', "-resize '{width_plus_plus}x{height}!'"),
]

priority_height = {16, 22, 27, 32, 34, 43, 64}
priority_value = {68, 84, 98}

for i in range(1000):
  percent_complete = i / 10
  if percent_complete % 5 == 0:
    print(f"{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}: ~{int(percent_complete)}%", file=stderr)

  for suffix in ['', 'k+', 'x']:
    quantity = f"{i}{suffix}"
    path = f"{DATA_DIR}/{quantity}"
    os.mkdir(path)

    for height in range(16, 65):
      for value in range(64, 113):
        for shift_label, shift in shifts:
          for smear_label, smear in smears:
            #if not (height in priority_height and value in priority_value and smear_label == "nosmear") and not rand.choice(chances):
            if not rand.choice(chances):
              continue

            width = round(21 * height / 16)
            font_size = round(3 * height / 8)
            color = f"{value:02X}{value:02X}{value:02X}"

            formatted_shift = shift.format(width=width, height=height)
            formatted_smear = smear.format(
              width=width,
              height=height,
              width_plus=width + 1,
              height_plus=height + 1,
              width_plus_plus=width + 2,
              height_plus_plus=height + 2,
            )

            filename = f"{width}x{height}-{font_size}pt-{color}-{shift_label}-{smear_label}"
            full_path = f"{path}/{filename}.png"

            #if os.path.exists(full_path):
            #  continue

            print(f"-background '#{color}' -fill white 'pango:<span font=\"Renner*\" size=\"{font_size}pt\">{quantity}</span>' -trim -gravity center -extent {width}x{height} {formatted_shift} {formatted_smear} -strip {full_path}")
