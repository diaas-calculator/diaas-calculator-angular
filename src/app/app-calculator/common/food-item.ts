import { ScoredObject } from './scored-object'
export interface FoodItem extends ScoredObject {
  id: number;
  name: string;
  food_type: String,
  protein_content_cooked_state: String,
  diaas_cooked_state: String,
  reference_link: String,
  reference_details: String,
  comment: String,
  hidden: boolean,
  // the food item used in the greenhouse gas database
  greenhouse_gas_ref: String,
  greenhouse_gas_link: String,
  greenhouse_gas_comment: String,
  comment_expert: String,
  greenhouse_gas_comment_expert: String
}

export interface FoodItemTranslation{
  lang: string;
  food_id: number;
  name_translation: string,
}


