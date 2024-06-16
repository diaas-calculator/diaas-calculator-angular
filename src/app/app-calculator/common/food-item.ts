import { ScoredObject } from './scored-object'
export interface FoodItem extends ScoredObject {
  id: number;
  name: string;
  protein_content: number,
  food_type: String,
  score_type: String,
  protein_content_cooked_state: String,
  diaas_cooked_state: String,
  // for mix computations
  food_weight: number,
  protein_weight: number,
  reference_link: String,
  reference_details: String,
  comment: String,
  hidden: boolean,
  greenhouse_gas: number
}

export interface FoodItemTranslation{
  lang: string;
  food_id: number;
  name_translation: string,
}


