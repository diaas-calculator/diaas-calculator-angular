#!/bin/sh
cut -d ';' -f1-3 food_full.csv > food_i18n.csv
cut -d ';' -f2,4-28,31-33 food_full.csv | sed 's/food_id;name;protein_content/id;name;protein_content/g' > food.csv
node csvToJson.js