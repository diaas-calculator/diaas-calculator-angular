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
  foodItems: any;
  foodItemsJsonFile:string = "../../assets/data/food.json";

  constructor(
    private http: HttpClient
  ) {
      console.error("constructor")
      this.http.get(this.foodItemsJsonFile).subscribe(res => {
        this.foodItems = res;
      });
  }


  searchFoodItems(foodNameFilter: string, foodTypeFilter: string, aaProfileFilter: string, showHidden: string): FoodItem[] {
    return this.foodItems;
  }
}
