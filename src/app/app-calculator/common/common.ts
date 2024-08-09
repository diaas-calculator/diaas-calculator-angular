import { ScoredObject } from './scored-object';

export function getDiaasStyle(diaasScore: number, scoredObject: ScoredObject): object {
  let minScore: number = Math.min(scoredObject.histidine_score, scoredObject.isoleucine_score, scoredObject.leucine_score, scoredObject.lysine_score, scoredObject.saa_score, scoredObject.aaa_score, scoredObject.threonine_score, scoredObject.tryptophane_score, scoredObject.valine_score)
  let minScoreStyle: object = {}
  if (diaasScore == minScore){
    minScoreStyle = { 'font-weight': 'bold', 'border': '2px solid black' };
  }

  if(diaasScore < 60){
    return Object.assign({}, {'background-color': 'red'}, minScoreStyle)
  }
  else if(diaasScore < 75){
    return Object.assign({}, {'background-color': 'orange'}, minScoreStyle)
  }
  else if(diaasScore <= 100){
    return Object.assign({}, {'background-color': 'yellowgreen'}, minScoreStyle)
  }
  else{
    return Object.assign({}, {'background-color': 'green'}, minScoreStyle)
  }
}

export function roundOneDecimal(myNumber: number){
  return  Math.round(myNumber * 10) / 10;
}

export function roundGreenhouseGasForDetailedDisplay(myNumber: number|undefined){
  return myNumber? Math.round(myNumber * 100) / 100 : 0;
}

export function roundGreenhouseGasRatioForMainDisplay(myNumber: number|undefined){
  return myNumber? Math.round(myNumber*10) / 10 : 0;
}


export function roundGreenhouseGasTotalForMainDisplay(myNumber: number|undefined){
  return myNumber? Math.round(myNumber) : 0;
}

export function getScoreLetter(scoreStandard: String): String{
  return scoreStandard.startsWith("DIAAS")?"D":"P";
}

export function getScoreLetterStyle(scoreStandard: String): object{
  if(getScoreLetter(scoreStandard) === 'P'){
    return { 'border': '0.15rem solid orange'}
  }
  else{
    return { 'border': '0.15rem solid green'}
  }
}
