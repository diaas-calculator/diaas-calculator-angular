import { ScoredObject } from '../common/scored-object'

// A mix of foodItems
// Only exists front-side
export interface Mix extends ScoredObject {
    // diaas if only diaas foodItems are present in the mix
    // else pdcaas
    score_type: String,
    protein_content: number,
    food_weight: number,
    protein_weight: number
  }
  