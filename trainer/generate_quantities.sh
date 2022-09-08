#!/bin/bash

compute() {
  accuracy=3
  printf %.2f "$((10**${accuracy} * $1))e-${accuracy}"
}

quantities=$(seq 0 999)
heights=$(seq 24 72)
suffixes=("" "k+" "x")
grays="444444 545454 636363"

font_sizes=$(seq 800 25 2800)

#quantities="2 7 11 80 164"
#heights="27 32 43 64"

for quantity in $quantities
do
  for suffix in "${suffixes[@]}"
  do
    label="${quantity}${suffix}"
    directory="quantities/${label}"

    echo "Processing: ${directory}"
    mkdir -p "$directory"

    for font_size in $font_sizes
    do
    #for height in $heights
    #do
      #width=$(compute ${height}*42/32 | sed 's/\.[0-9]*$//')
      #vertical_offset=$(compute ${height}*35/128)
      #vertical_offset=$(compute ${height}*71/256)
      #font_size=$(compute ${height}*63/172)
      #font_size=$(compute ${height}*12/32)
      #font_size=$(compute ${width}*12/42)

      file="${directory}/${font_size}"
      font_size=$(compute ${font_size}/100)

      #if [ "$font_size" = "16.00" ]
      #then
      #  font_size=15.75
      #fi

      #for gray in $grays
      #do
        #file="${directory}/${height}"
        #file="${directory}/${height}-${gray}"
        #echo $quantity,$suffix,$width,$height,$font_size,$vertical_offset
        #convert \
        #  -background "#${gray}" \
        #  -fill white \
        #  -font 'Renner-Book.ttf' \
        #  -size $width \
        #  -gravity center \
        #  pango:'<span font="Renner*" size="'$font_size'pt">'"$label"'</span>' \
        #  -gravity none \
        #  -extent "${width}x${height}-0-${vertical_offset}" \
        #  +write "${file}.png" \
        #  "${file}.jpg"
        convert \
          -background white \
          -fill black \
          pango:'<span font="Renner*" size="'$font_size'pt">'"$label"'</span>' \
          -resize 500% \
          -threshold 66% \
          -trim \
          "${file}.png"
      #done
    done
  done
done

# 4k
#convert -background gray -fill white -font 'Renner-Book.ttf' -size 84 -gravity center pango:'<span font="Renner*" size="24pt">2k+</span>' -gravity none -extent 84x64-0-18 label_color3.png

# 1440p
#convert -background gray -fill white -font 'Renner-Book.ttf' -size 56 -gravity center pango:'<span font="Renner*" size="15.75pt">80</span>' -gravity none -extent 56x43-0-12 label_color2.png

# 1080p
#convert -background gray -fill white -font 'Renner-Book.ttf' -size 42 -gravity center pango:'<span font="Renner*" size="12pt">7k+</span>' -gravity none -extent 42x32-0-9 label_color1.png
#convert -background gray -fill white -font 'Renner-Book.ttf' -size 42 -gravity center pango:'<span font="Renner*" size="12pt">7k+</span>' -gravity none -extent 42x32-0-8.75 label_color7.png

# 900p
#convert -background gray -fill white -font 'Renner-Book.ttf' -size 35 -gravity center pango:'<span font="Renner*" size="9.89pt">164</span>' -gravity none -extent 35x27-0-7 label_color6.png
#convert -background gray -fill white -font 'Renner-Book.ttf' -size 35 -gravity center pango:'<span font="Renner*" size="9.89pt">164</span>' -gravity none -extent 35x27-0-7.38 label_color6.png
