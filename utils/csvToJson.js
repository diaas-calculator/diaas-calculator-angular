let csvToJson = require('convert-csv-to-json');

let fileInputNameFood = './food.csv'; 
let fileOutputNameFood = '../src/assets/data/food.json';
let fileInputNameFoodI18n = './food_i18n.csv'; 
let fileOutputNameFoodI18n = '../src/assets/data/food_i18n.json';


csvToJson.formatValueByType().generateJsonFileFromCsv(fileInputNameFood,fileOutputNameFood);
csvToJson.formatValueByType().generateJsonFileFromCsv(fileInputNameFoodI18n,fileOutputNameFoodI18n);
