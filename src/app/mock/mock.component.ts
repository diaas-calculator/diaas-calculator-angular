import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodItem, FoodItemTranslation } from '../app-calculator/common/food-item';
import { MixDetails } from '../app-calculator/mix/mix';

@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrl: './mock.component.css'
})

@Injectable({
  providedIn: 'root',
})
export class MockComponent {
  foodItemsJsonFile: string = "../../assets/data/food.json";
  foodItems: FoodItem[] = [];
  
  foodItemTranslationsFile: string = "../../assets/data/food_i18n.json";
  foodItemTranslations: FoodItemTranslation[] = [];
  // map concat(food_id,language) -> translation for indexing the translations by food_id / language pairs
  foodItemTranslationsMap: Map<string, FoodItemTranslation> = new Map<string, FoodItemTranslation>();

  mixJsonFile: string = "../../assets/data/mix.json";
  mixes: MixDetails[] = [];
  
  constructor(
    private http: HttpClient
  ) {
      this.http.get<FoodItem[]>(this.foodItemsJsonFile).subscribe(res => {
        this.foodItems = res;
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
      });

      this.http.get<MixDetails[]>(this.mixJsonFile).subscribe(res => {
        this.mixes = res;
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
              this.foodItemTranslationsMap,
              foodItem.id,
              lang,
              foodItem.name
            )
          ])
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
  private getFoodItemTranslationAlwaysDefined(foodItemTranslationsMap: Map<string, FoodItemTranslation>, food_id: number, lang: string, name: string){
    let foodItemTranslation: (FoodItemTranslation | undefined) = 
      foodItemTranslationsMap.get(
        this.getFoodItemTranslationMapKey(food_id, lang)
    )
    return foodItemTranslation ? foodItemTranslation : 
      {"lang": lang, "food_id": food_id, "name_translation": name}
  }

  getExampleMixesDetails(){
    return this.mixes
  }

}
