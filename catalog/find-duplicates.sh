#!/bin/sh

echo "Calculating SHA-256 of image data."
find training -type f -name '*-64-0.png' \
  | xargs -P30 -n1 identify -format '%# %i\n' \
  | sed 's% \(training/[^/]*\)/% \1 %' \
  > training.sha

echo "Searching SHAs for duplicates."
awk '{print $1" "$2}' training.sha \
  | sort -k2,2 -k1,1 \
  | uniq \
  | awk '{print$1}' \
  | sort \
  | uniq -c \
  | grep -v ' 1 ' \
  | awk '{print$2}' \
  | xargs \
  | sed 's/ /|/g' \
  | xargs -I@ grep -E '@' training.sha \
  | sort \
  > duplicates.sha

echo "Found $(cat duplicates.sha | wc -l) duplicates."
