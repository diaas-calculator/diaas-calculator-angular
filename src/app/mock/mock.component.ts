import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodItem } from '../app-calculator/common/food-item';

@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrl: './mock.component.css'
})

@Injectable({
  providedIn: 'root',
})
export class MockComponent {
  foodItems: FoodItem[] = [];
  foodItemsJsonFile:string = "../../assets/data/food.json";

  constructor(
    private http: HttpClient
  ) {
      console.error("constructor")
      this.http.get<FoodItem[]>(this.foodItemsJsonFile).subscribe(res => {
        this.foodItems = res;
      });
  }


  searchFoodItems(foodNameFilter: string, foodTypeFilter: string, aaProfileFilter: string, showHidden: string): FoodItem[] {
    console.log("showHidden" + showHidden)
    return this.foodItems
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
      ;
  }

  isRespectingAaProfileFilter(foodItem: FoodItem, aaProfileFilter: string): boolean{
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
}
