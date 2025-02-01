let csvToJson = require('convert-csv-to-json');

let fileInputName = './food.csv'; 
let fileOutputName = '../src/assets/data/food.json';

csvToJson.formatValueByType().generateJsonFileFromCsv(fileInputName,fileOutputName);
