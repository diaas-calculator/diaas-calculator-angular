export interface ScoredObject {
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
    protein_content: number,
    protein_weight: number,
    food_weight: number,
  }
  