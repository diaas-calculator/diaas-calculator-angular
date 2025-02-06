let csvToJson = require('convert-csv-to-json');

let revFood = "_v1.1"
let revMix = "_v1.1"


let fileInputNameFood = './food.csv'; 
let fileOutputNameFood = '../src/assets/data/food' + revFood + '.json';
let fileInputNameFoodI18n = './food_i18n.csv'; 
let fileOutputNameFoodI18n = '../src/assets/data/food_i18n' + revFood + '.json';
let fileInputNameMix = './mix.csv'; 
let fileOutputNameMix = '../src/assets/data/mix' + revMix + '.json';
let fileInputNameMixFood = './mix_food.csv'; 
let fileOutputNameMixFood = '../src/assets/data/mix_food' + revMix + '.json';

csvToJson.formatValueByType().generateJsonFileFromCsv(fileInputNameFood,fileOutputNameFood);
csvToJson.formatValueByType().generateJsonFileFromCsv(fileInputNameFoodI18n,fileOutputNameFoodI18n);
csvToJson.formatValueByType().generateJsonFileFromCsv(fileInputNameMix,fileOutputNameMix);
csvToJson.formatValueByType().generateJsonFileFromCsv(fileInputNameMixFood,fileOutputNameMixFood);
