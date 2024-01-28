import { ScoredObject } from '../common/scored-object'

// A mix of foodItems
// Only exists front-side
export interface Mix extends ScoredObject {
    // diaas if only diaas foodItems are present in the mix
    // else pdcaas
    score_type: String,
    histidine_score: number,
    isoleucine_score: number,
    leucine_score: number,
    lysine_score: number,
    saa_score: number,
    aaa_score: number,
    threonine_score: number,
    tryptophane_score: number,
    valine_score: number,
    food_weight: number,
    protein_weight: number
  }
  