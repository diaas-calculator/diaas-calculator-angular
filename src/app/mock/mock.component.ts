import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodItem, FoodItemTranslation } from '../app-calculator/common/food-item';
import { MixDetails, MixFood, MixFoodJoin, MixFoodJoinI18n } from '../app-calculator/mix/mix';

@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrl: './mock.component.css'
})

@Injectable({
  providedIn: 'root',
})
export class MockComponent {
  // prevents cache from serving the wrong file
  revFood: string = "_v1.1"
  revMix: string = "_v1.1"
  foodItemsJsonFile: string = "../../assets/data/food" + this.revFood + ".json";
  foodItems: FoodItem[] = [];
  
  foodItemTranslationsFile: string = "../../assets/data/food_i18n" + this.revFood + ".json";
  foodItemTranslations: FoodItemTranslation[] = [];
  // map concat(food_id,language) -> translation for indexing the translations by food_id / language pairs
  foodItemTranslationsMap: Map<string, FoodItemTranslation> = new Map<string, FoodItemTranslation>();

  // Mix mock
  mixJsonFile: string = "../../assets/data/mix" + this.revMix + ".json";
  mixes: MixDetails[] = [];
  mixFoodJsonFile: string = "../../assets/data/mix_food" + this.revMix + ".json";
  mixFoods: MixFood[] = [];

  // map food_id -> food for indexing food items (join to build MixFoodJoin)
  foodItemMap: Map<number, FoodItem> = new Map<number, FoodItem>();
  
  constructor(
    private http: HttpClient
  ) {
      this.http.get<FoodItem[]>(this.foodItemsJsonFile).subscribe(res => {
        this.foodItems = res.sort(
          (foodItem1, foodItem2) => {
            return (foodItem1.name.toLowerCase() < foodItem2.name.toLowerCase()) ? -1 : 1
          }
        )
        this.foodItems.forEach(
          (foodItem) => this.foodItemMap.set(
            foodItem.id, foodItem
          )
        )
      });
      this.http.get<FoodItemTranslation[]>(this.foodItemTranslationsFile).subscribe(res => {
        this.foodItemTranslations = res;
        this.foodItemTranslations.forEach(
          (foodItemTranslation) => this.foodItemTranslationsMap.set(
            // key
            this.getFoodItemTranslationMapKey(foodItemTranslation.food_id, foodItemTranslation.lang),
            // value
            foodItemTranslation
          )
        )

        this.http.get<MixDetails[]>(this.mixJsonFile).subscribe(res => {
          this.mixes = res;
        });

        this.http.get<MixFood[]>(this.mixFoodJsonFile).subscribe(res => {
          this.mixFoods = res;
        });

      });
  }


  searchFoodItems(foodNameFilter: string, foodTypeFilter: string, aaProfileFilter: string, showHidden: string): FoodItem[] {
    return this.applyFilters(this.foodItems, foodNameFilter, foodTypeFilter, aaProfileFilter, showHidden)
  }

  private applyFilters(foodItems: FoodItem[], foodNameFilter: string, foodTypeFilter: string, aaProfileFilter: string, showHidden: string): FoodItem[]{
    return foodItems
    .filter(
      (foodItem) => foodItem.name.toLowerCase().includes(foodNameFilter.toLowerCase())
    )
    .filter(
      (foodItem) => foodTypeFilter === 'all' || foodItem.food_type === foodTypeFilter
    )
    .filter(
      (foodItem) => this.isRespectingAaProfileFilter(foodItem, aaProfileFilter)
    )
    .filter(
      (foodItem) => showHidden === 'true' || ! foodItem.hidden
    )
  }

  private isRespectingAaProfileFilter(foodItem: FoodItem, aaProfileFilter: string): boolean{
    if(aaProfileFilter === 'all'){
      return true
    }
    else if (aaProfileFilter === 'high-quality'){
      return foodItem.histidine_score >= 75
        && foodItem.isoleucine_score >= 75
        && foodItem.isoleucine_score >= 75
        && foodItem.leucine_score >= 75
        && foodItem.lysine_score >= 75
        && foodItem.saa_score >= 75
        && foodItem.aaa_score >= 75
        && foodItem.threonine_score >= 75
        && foodItem.tryptophane_score >= 75
        && foodItem.valine_score >= 75
    }
    else if (aaProfileFilter === 'his+'){
      return foodItem.histidine_score > 100
    }
    else if (aaProfileFilter === 'ile+'){
      return foodItem.isoleucine_score > 100
    }
    else if (aaProfileFilter === 'leu+'){
      return foodItem.leucine_score > 100
    }
    else if (aaProfileFilter === 'lys+'){
      return foodItem.lysine_score > 100
    }
    else if (aaProfileFilter === 'saa+'){
      return foodItem.saa_score > 100
    }
    else if (aaProfileFilter === 'aaa+'){
      return foodItem.aaa_score > 100
    }
    else if (aaProfileFilter === 'thr+'){
      return foodItem.threonine_score > 100
    }
    else if (aaProfileFilter === 'trp+'){
      return foodItem.tryptophane_score > 100
    }
    else if (aaProfileFilter === 'val+'){
      return foodItem.valine_score > 100
    }
    else{
      // should never happen
      console.error("Unknown profile filter: " + aaProfileFilter)
      return false;
    }
  }

  /**
   * Returns an array of array. 
   * Each element of the outer array is and array where the first element is the FoodItem and the second is the FoodItemTranslation
   * May seem a little complicated but it is what the rust backend was returning so keeping the same interface
   * @param foodNameFilter 
   * @param foodTypeFilter 
   * @param aaProfileFilter 
   * @param lang 
   * @param showHidden 
   * @returns 
   */
  searchFoodItemsI18n(foodNameFilter: string, foodTypeFilter: string, aaProfileFilter: string, lang: string, showHidden: string):  (FoodItem|FoodItemTranslation)[][] {
    let foodItemFoodItemsTranslationArray: (FoodItem|FoodItemTranslation)[][] = []
    this.applyFilters(this.foodItems, foodNameFilter, foodTypeFilter, aaProfileFilter, showHidden)
      .forEach(
        (foodItem) => 
        {
          foodItemFoodItemsTranslationArray.push(
          [
            foodItem, 
            this.getFoodItemTranslationAlwaysDefined(
              foodItem.id,
              lang,
              foodItem.name
            )
          ])
        }
      )
      foodItemFoodItemsTranslationArray.sort(
        (fiFit1, fiFit2) => {
          // using custom type guards to determine the type
          let fit1: FoodItem | FoodItemTranslation = fiFit1[1]
          let fit2: FoodItem | FoodItemTranslation = fiFit2[1]
          if ('name_translation' in fit1  && 'name_translation' in fit2){
            return (fit1.name_translation.toLowerCase() < fit2.name_translation.toLowerCase()) ? -1 : 1
          }
          else{
            return -1
          }
        }
      )  
    return foodItemFoodItemsTranslationArray
  }

  private getFoodItemTranslationMapKey(food_id: number, lang: string){
    return '' + food_id + lang
  }

  /**
   * Get the food name translation or return a default FoodItemTranslation in english
   * @param foodItemTranslationsMap 
   * @param food_id 
   * @param lang language for which we want the translation
   * @param name english food name. This is what we'll be using if the translation is not found
   * @returns 
   */
  private getFoodItemTranslationAlwaysDefined(food_id: number, lang: string, name: string){
    let foodItemTranslation: (FoodItemTranslation | undefined) = 
      this.foodItemTranslationsMap.get(
        this.getFoodItemTranslationMapKey(food_id, lang)
    )
    return foodItemTranslation ? foodItemTranslation : 
      {"lang": lang, "food_id": food_id, "name_translation": name}
  }

  getExampleMixesDetails(){
    return this.mixes
  }

  getExampleMixFoodJoin(mixId: number): MixFoodJoin[]{
    let mixFoodJoin: MixFoodJoin[] = []
    this.mixFoods
      .filter(
        (mixFood) => mixFood.mix_id == mixId
      )
      .forEach(
        (mixFood) => mixFoodJoin.push(
          {
            "id": mixId, 
            "food_weight": mixFood.food_weight,
            "food": this.getFoodAlwaysDefined(mixFood.food_id)
          }
        )
      )
    return mixFoodJoin
  }

  getFoodAlwaysDefined(foodId: number): FoodItem{
    let foodItem: (FoodItem | undefined) = this.foodItemMap.get(foodId)
    if(!foodItem){
      throw new Error("Internal error: cannot find food of id " + foodId);
    }
    return foodItem
  }

  getExampleMixFoodJoinI18n(mixId: number, lang: string){
    let mixFoodJoin: MixFoodJoinI18n[] = []
    this.mixFoods
      .filter(
        (mixFood) => mixFood.mix_id == mixId
      )
      .forEach(
        (mixFood) => {
          let foodItem: FoodItem = this.getFoodAlwaysDefined(mixFood.food_id)
          mixFoodJoin.push(
            {
              "id": mixId, 
              "food_weight": mixFood.food_weight,
              "name_translation" : this.getFoodItemTranslationAlwaysDefined(
                mixFood.food_id,
                lang,
                foodItem.name
              ).name_translation,
              "food": foodItem
            }
          )
        }
      )
    return mixFoodJoin
  }
}
