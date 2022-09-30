#!/bin/sh
# dependencies: the nodePackage rollup, base64, awk

set -e

mkdir -p ./gs-build

# bundle js stuff info into html file
awk '1;/<!-- insert js blob here -->/{exit}' gs-sidebar.html > ./gs-build/fir-sidebar.html

#echo "const BASE64_GROUP1_SHARD1OF1 = \`" >> ./gs-build/fir-sidebar.html
#base64 ./includes/classifier/group1-shard1of1.bin >> ./gs-build/fir-sidebar.html
#echo "\`;" >> ./gs-build/fir-sidebar.html

# embed jsons:

echo "const JSON_CATALOG = \`" >> ./gs-build/fir-sidebar.html
cat ../includes/foxhole/inferno/catalog.json | sed 's/\\/\\\\/g' >> ./gs-build/fir-sidebar.html
echo "\`;" >> ./gs-build/fir-sidebar.html

echo "const JSON_CLASS_NAMES = \`" >> ./gs-build/fir-sidebar.html
cat ../includes/foxhole/inferno/classifier/class_names.json | sed 's/\\/\\\\/g' >> ./gs-build/fir-sidebar.html
echo "\`;" >> ./gs-build/fir-sidebar.html

echo "const JSON_QUANTITIES_CLASS_NAMES = \`" >> ./gs-build/fir-sidebar.html
cat ../includes/quantities/class_names.json | sed 's/\\/\\\\/g' >> ./gs-build/fir-sidebar.html
echo "\`;" >> ./gs-build/fir-sidebar.html

echo "const JSON_CLASSIFIER_MODEL = \`" >> ./gs-build/fir-sidebar.html
cat ../includes/foxhole/inferno/classifier/model.json | sed 's/\\/\\\\/g' >> ./gs-build/fir-sidebar.html
echo "\`;" >> ./gs-build/fir-sidebar.html

echo "const JSON_QUANTITIES_MODEL = \`" >> ./gs-build/fir-sidebar.html
cat ../includes/quantities/model.json | sed 's/\\/\\\\/g' >> ./gs-build/fir-sidebar.html
echo "\`;" >> ./gs-build/fir-sidebar.html

# embed files for which we will need to generate URLs

echo "const BASE64_CLASSIFIER_BINARY_MODEL = \`" >> ./gs-build/fir-sidebar.html
base64 ../includes/foxhole/inferno/classifier/group1-shard1of1.bin >> ./gs-build/fir-sidebar.html
echo "\`;" >> ./gs-build/fir-sidebar.html

echo "const BASE64_QUANTITY_BINARY_MODEL = \`" >> ./gs-build/fir-sidebar.html
base64 ../includes/quantities/group1-shard1of1.bin >> ./gs-build/fir-sidebar.html
echo "\`;" >> ./gs-build/fir-sidebar.html

#echo "const BASE64_CLASSIFIER_MODEL = \`" >> ./gs-build/fir-sidebar.html
#base64 ../includes/classifier/model.json >> ./gs-build/fir-sidebar.html
#echo "\`;" >> ./gs-build/fir-sidebar.html

#echo "const BASE64_QUANTITIES_MODEL = \`" >> ./gs-build/fir-sidebar.html
#base64 ../includes/quantities/model.json >> ./gs-build/fir-sidebar.html
#echo "\`;" >> ./gs-build/fir-sidebar.html

# check that rollup is installed or request installation
if type "rollup" 2&> /dev/null; then
  ROLLUP="rollup"
fi
if [ -e "node_modules/.bin/rollup" ]; then
  ROLLUP="node_modules/.bin/rollup"
fi
if [ -z $ROLLUP ]; then
  echo 'Please install rollup e.g. with `npm install`.'
  exit 1
fi

# bundle js
$ROLLUP gs-sidebar/main.js --file ./gs-build/bundle.js --format es
cat ./gs-build/bundle.js >> ./gs-build/fir-sidebar.html
rm ./gs-build/bundle.js

awk 'x==1 {print $1} /<!-- insert js blob here -->/ {x=1}' gs-sidebar.html >> ./gs-build/fir-sidebar.html

cp ./gs-sidebar.gs ./gs-build/fir-sidebar-gs.gs
