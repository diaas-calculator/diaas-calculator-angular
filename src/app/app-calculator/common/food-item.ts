import { ScoredObject } from './scored-object'
export interface FoodItem extends ScoredObject {
  id: number;
  name: string;
  protein_content: number,
  food_type: String,
  score_type: String,
  protein_content_cooked_state: String,
  diaas_cooked_state: String,
  histidine_score: number,
  isoleucine_score: number,
  leucine_score: number,
  lysine_score: number,
  saa_score: number,
  aaa_score: number,
  threonine_score: number,
  tryptophane_score: number,
  valine_score: number,
  // for mix computations
  food_weight: number,
  protein_weight: number,
  reference_link: String,
  reference_details: String,
  comment: String,
}

export interface Results<FoodItem> {
  results: FoodItem[];
}

export interface FoodItemTranslation{
  lang: string;
  food_id: number;
  name_translation: string,
}


// first element is the FoodItem, second element is the FoodItemTranslation
export interface ResultsI18n {
  results: (FoodItem|FoodItemTranslation)[][];
}

