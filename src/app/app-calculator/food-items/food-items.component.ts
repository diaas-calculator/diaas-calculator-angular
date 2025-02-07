import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodItem, FoodItemTranslation} from '../common/food-item';
import { ScoredObject } from '../common/scored-object';
import { FoodItemsService } from './food-items.service';
import { MixComponent } from '../mix/mix.component';
import { getDiaasStyle, roundOneDecimal, getScoreLetter, getScoreLetterStyle, roundGreenhouseGasRatioForMainDisplay} from '../common/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { FoodItemDetailsComponent } from '../food-item-details/food-item-details';

@Component({
  standalone: true,
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  imports: [ 
    CommonModule,
    FormsModule, 
    NgbTooltipModule, 
    DropdownModule,
    FoodItemDetailsComponent],
  providers: [FoodItemsService],
  styleUrls: ['./food-items.component.css']
})
export class FoodItemsComponent implements OnInit {
  foodItems: FoodItem[] = [];
  foodItemDetails: FoodItem | undefined; // the foodItem currently being edited
  foodItemName = ''; // the food item name being searched
  currentMixComponent: MixComponent = MixComponent.getCurrentMix();
  currentNameFilter = '';
  currentFoodTypeFilter = 'all';
  currentAaProfileFilter = 'all';

  aaProfileFilters = [ "all", "high-quality", "leu+", "lys+", "saa+", "his+", "ile+", "aaa+", "thr+", "trp+", "val+"  ]

  constructor(
    private foodItemsService: FoodItemsService, 
    private router: Router) 
    {}

  @ViewChild('foodItemEditInput')
  set foodItemEditInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  ngOnInit() {
    this.search()    
  }

  getDiaasStyle(diaasScore: number, scoredObject: ScoredObject): object {
    return getDiaasStyle(diaasScore, scoredObject);
  }

  getScoreLetter(scoreStandard: String): String{
    return getScoreLetter(scoreStandard);
  }

  getScoreLetterStyle(scoreStandard: String): object{
    return getScoreLetterStyle(scoreStandard);
  }
  

  search() {
    let lang : string|null = sessionStorage.getItem('lang');
    // if user never went go to the advanced settings, showHidden is null (in which case showHiddenStr defaults to false)
    let showHidden : string|null = sessionStorage.getItem('showHidden');
    let showHiddenStr: string = "false"
    if(showHidden){
      showHiddenStr = showHidden
    }
    this.foodItemDetails = undefined;

    if(lang && lang !== 'en'){
      this.foodItems = this.foodItemsService
        .searchFoodItemsI18n(this.currentNameFilter, this.currentFoodTypeFilter, this.currentAaProfileFilter, lang, showHiddenStr)
        .map(
          foodItemFoodItemsTranslationArray => {
            // picking up the food name from the FoodItemTranslation object and copying to the FoodItem ; returning this
            let fi: FoodItem = foodItemFoodItemsTranslationArray[0] as FoodItem
            let fit: FoodItemTranslation = foodItemFoodItemsTranslationArray[1] as FoodItemTranslation
            fi.name = fit.name_translation
            return fi
          }
        )
    }
    else{
      this.foodItems = this.foodItemsService
        .searchFoodItems(this.currentNameFilter, this.currentFoodTypeFilter, this.currentAaProfileFilter, showHiddenStr);
    }

  }

  setFoodTypeFilter(foodType: string){
    this.currentFoodTypeFilter = foodType;
  }

  
  setNameFilter(foodName: string){
    this.currentNameFilter = foodName;
    this.search();
  }



  addToMix(foodItem: FoodItem): void {
    if(MixComponent.getCurrentMix()){
      MixComponent.getCurrentMix().addToMix(foodItem)
      this.router.navigate(['/protein-diaas-and-carbon-footprint-calculator'], {fragment: 'diaasmix'});
    }
    else{
      console.error("internal error: MixComponent.currentMixComponent not initialized");
    }
  }

	openFoodItemDetails(foodItemDetails: FoodItem) {
		FoodItemDetailsComponent.getFoodItemDetailsComponent().openFoodItemDetails(foodItemDetails);
	}


  roundScoreForDisplay(myNumber: number): number {
    return Math.round(myNumber);
  }

  roundWeightForDisplay(myNumber: number): number {
    return roundOneDecimal(myNumber);
  }

  roundGreenhouseGasRatioForMainDisplay(myNumber: number|undefined){
    return roundGreenhouseGasRatioForMainDisplay(myNumber);
  }

}
