import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodItem } from '../common/food-item';
import { ScoredObject } from '../common/scored-object';
import { Mix } from './mix';
import { MixService } from './mix.service';
import { getDiaasStyle } from '../common/common';

@Component({
  standalone: true,
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  imports: [ CommonModule, FormsModule ],
  providers: [MixService],
  styleUrls: ['./mix.component.css']
})
export class MixComponent implements OnInit {
  foodItems: FoodItem[] = [];
  editFoodItemQuantity: FoodItem | undefined; // the foodItem which quantity is currently being edited
  editFoodItemProteinContent: FoodItem | undefined; // the foodItem which protein content is currently being edited
  foodItemName: string = ''; // the food item name being searched
  static currentMixComponent: MixComponent;
  mix: Mix = this.getInitialMix();

  constructor(private mixService: MixService) {
    if (MixComponent.currentMixComponent) {
      return MixComponent.currentMixComponent;
    }
  }

  @ViewChild('foodItemEditProteinContentInput')
  set foodItemEditProteinContentInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  @ViewChild('foodItemEditQuantityInput')
  set foodItemEditQuantityInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  ngOnInit() {
    if (!MixComponent.currentMixComponent) {
      MixComponent.currentMixComponent = this;
    }
   
   console.log("mix component ngOnInit");
  }

  ngOnDestroy(): void {
    console.log("mix component ngOnDestroy");
  }


  getInitialMix() {
    return {
      score_type: 'diaas',
      histidine_score: 0,
      isoleucine_score: 0,
      leucine_score: 0,
      lysine_score: 0,
      saa_score: 0,
      aaa_score: 0,
      threonine_score: 0,
      tryptophane_score: 0,
      valine_score: 0,
      food_weight: 0,
      protein_weight: 0
    }
  }


  getDiaasStyle(diaasScore: number, scoredObject: ScoredObject): object {
    return getDiaasStyle(diaasScore, scoredObject);
  }

  getMix(): FoodItem[] {
    return this.foodItems;
  }


  remove(foodItem: FoodItem): void {
    this.foodItems = this.foodItems.filter(h => h !== foodItem);
    this.computeMixDiaas();
  }

  editProteinContent(foodItemProteinContent: string) {
    if (foodItemProteinContent && this.editFoodItemProteinContent) {
      //let foodItemProteinContentNumber: number = + foodItemProteinContent;
      let foodItemProteinContentNumber: number = Number(foodItemProteinContent)
      if (isNaN(foodItemProteinContentNumber)) {
        alert("Not a number")
        this.editProteinContent("" + this.editFoodItemProteinContent.protein_content)
        return
      }
      this.editFoodItemProteinContent.protein_content = foodItemProteinContentNumber;
      let mixProteinWeight: number = this.editFoodItemProteinContent.protein_content / 100 * this.editFoodItemProteinContent.food_weight;
      this.editFoodItemProteinContent.protein_weight = Math.round(mixProteinWeight * 10) / 10;
      this.editFoodItemProteinContent = undefined;
      this.computeMixDiaas();
    }
  }

  editQuantity(foodItemQuantity: string) {
    if (foodItemQuantity && this.editFoodItemQuantity) {
      let foodItemQuantityNumber: number = Number(foodItemQuantity)
      if (isNaN(foodItemQuantityNumber)) {
        alert("Not a number")
        this.editQuantity("" + this.editFoodItemQuantity.food_weight)
        return
      }
      this.editFoodItemQuantity.food_weight = foodItemQuantityNumber;
      let mixProteinWeight: number = this.editFoodItemQuantity.protein_content / 100 * this.editFoodItemQuantity.food_weight;
      this.editFoodItemQuantity.protein_weight = Math.round(mixProteinWeight * 10) / 10;
      this.editFoodItemQuantity = undefined;
      this.computeMixDiaas();
    }
  }



  addToMix(foodItem: FoodItem): void {
    if(this.foodItems.indexOf(foodItem) == -1){
      foodItem.food_weight = 100;
      foodItem.protein_weight = foodItem.protein_content;
      this.foodItems.push(foodItem);
      this.computeMixDiaas();
    }
    else{
      alert("Already in mix");
    }
  }

  // Ref: https://onlinelibrary.wiley.com/doi/full/10.1002/fsn3.1809 "2.3 DIAAS of protein mixtures"
  computeMixDiaas(): void {
    let mixUpdated: Mix = this.getInitialMix();
    let mixTotalProteinWeight = this.foodItems.reduce((prevVal, elem) => prevVal + elem.protein_weight, 0); 
    
    for (let i: number = 0; i<this.foodItems.length; i++){
      if(this.foodItems[i].score_type == 'pdcaas'){
        mixUpdated.score_type = 'pdcaas';
      }
      mixUpdated.histidine_score += this.foodItems[i].histidine_score*this.foodItems[i].protein_weight/mixTotalProteinWeight;
      mixUpdated.isoleucine_score += this.foodItems[i].isoleucine_score*this.foodItems[i].protein_weight/mixTotalProteinWeight;
      mixUpdated.leucine_score += this.foodItems[i].leucine_score*this.foodItems[i].protein_weight/mixTotalProteinWeight;
      mixUpdated.lysine_score += this.foodItems[i].lysine_score*this.foodItems[i].protein_weight/mixTotalProteinWeight;
      mixUpdated.saa_score += this.foodItems[i].saa_score*this.foodItems[i].protein_weight/mixTotalProteinWeight;
      mixUpdated.aaa_score += this.foodItems[i].aaa_score*this.foodItems[i].protein_weight/mixTotalProteinWeight;
      mixUpdated.threonine_score += this.foodItems[i].threonine_score*this.foodItems[i].protein_weight/mixTotalProteinWeight;
      mixUpdated.tryptophane_score += this.foodItems[i].tryptophane_score*this.foodItems[i].protein_weight/mixTotalProteinWeight;
      mixUpdated.valine_score += this.foodItems[i].valine_score*this.foodItems[i].protein_weight/mixTotalProteinWeight;
    }

    mixUpdated.histidine_score = Math.round(mixUpdated.histidine_score);
    mixUpdated.isoleucine_score = Math.round(mixUpdated.isoleucine_score);
    mixUpdated.leucine_score = Math.round(mixUpdated.leucine_score);
    mixUpdated.lysine_score = Math.round(mixUpdated.lysine_score);
    mixUpdated.saa_score = Math.round(mixUpdated.saa_score);
    mixUpdated.aaa_score = Math.round(mixUpdated.aaa_score);
    mixUpdated.threonine_score = Math.round(mixUpdated.threonine_score);
    mixUpdated.tryptophane_score = Math.round(mixUpdated.tryptophane_score);
    mixUpdated.valine_score = Math.round(mixUpdated.valine_score);
    this.mix=mixUpdated;
  }
}
