import { FoodItem } from '../common/food-item'
import { ScoredObject } from '../common/scored-object'

// Holds the mix DIAAS and protein/food weights values (most of wich are computed front-side)
export interface MixDIAASAndWeights extends ScoredObject {
}


export interface MixFood{
  mix_id: number,
  food_id: number,
  food_weight: number
}

// The food with weight as retrieved from the backend when sql joining Mix to Food through mix_food table
// (the value of the food_weight is outside of the Food struct at this point)
export interface MixFoodJoin{
  // the mix id
  id: number,
  food_weight: number,
  food: FoodItem
}

export interface MixFoodJoinI18n{
  // the mix id
  id: number,
  food_weight: number,
  name_translation: string,
  food: FoodItem
}

// The mix details from the database
export interface MixDetails{
  id: number,
  name: String,
  description: String
  recipe_link: String
}