import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodItem, FoodItemTranslation} from '../common/food-item';
import { ScoredObject } from '../common/scored-object';
import { FoodItemsService } from './food-items.service';
import { MixComponent } from '../mix/mix.component';
import { getDiaasStyle, roundOneDecimal, getScoreLetter, getScoreLetterStyle, roundGreenhouseGasForMainDisplay} from '../common/common';
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
    this.search();
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
  

  add(name: string): void {
    this.foodItemDetails = undefined;
    name = name.trim();
    if (!name) {
      return;
    }

    // The server will generate the id for this new foodItem
    const newFoodItem: FoodItem = { name } as FoodItem;
    this.foodItemsService
      .addFoodItem(newFoodItem)
      .subscribe(foodItem => this.foodItems.push(foodItem));
  }

  delete(foodItem: FoodItem): void {
    this.foodItems = this.foodItems.filter(h => h !== foodItem);
    this.foodItemsService
      .deleteFoodItem(foodItem.id)
      .subscribe();
  }

  edit(foodItemName: string) {
    this.update(foodItemName);
    this.foodItemDetails = undefined;
  }

  search() {
    let lang : string|null = sessionStorage.getItem('lang');
    let showHidden : string|null = sessionStorage.getItem('showHidden');
    let showHiddenStr: string = "false"
    if(showHidden){
      showHiddenStr = showHidden
    }
    this.foodItemDetails = undefined;

    if(lang && lang !== 'en'){
      //TODO error handling?
      this.foodItemsService
        .searchFoodItemsI18n(this.currentNameFilter, this.currentFoodTypeFilter, this.currentAaProfileFilter, lang, showHiddenStr)
        .subscribe(
          foodItemsI18n => (this.foodItems = foodItemsI18n.map(
            fiI18n => {
              let fi: FoodItem = fiI18n[0] as FoodItem
              let fit: FoodItemTranslation = fiI18n[1] as FoodItemTranslation
              fi.name = fit.name_translation
              return fi
            }
          ))
        );
    }
    else{
      this.foodItemsService
        .searchFoodItems(this.currentNameFilter, this.currentFoodTypeFilter, this.currentAaProfileFilter, showHiddenStr)
        .subscribe(foodItems => (this.foodItems = foodItems));
    }

  }

  setFoodTypeFilter(foodType: string){
    this.currentFoodTypeFilter = foodType;
  }

  
  setNameFilter(foodName: string){
    this.currentNameFilter = foodName;
    this.search();
  }


  update(foodItemName: string) {
    if (foodItemName && this.foodItemDetails && this.foodItemDetails.name !== foodItemName) {
      this.foodItemsService
        .updateFoodItem({...this.foodItemDetails, name: foodItemName})
        .subscribe(foodItem => {
        // replace the foodItem in the foodItems list with update from server
        const ix = foodItem ? this.foodItems.findIndex(h => h.id === foodItem.id) : -1;
        if (ix > -1) {
          this.foodItems[ix] = foodItem;
        }
      });
      this.foodItemDetails = undefined;
    }
  }


  addToMix(foodItem: FoodItem): void {
    if(MixComponent.getCurrentMix()){
      MixComponent.getCurrentMix().addToMix(foodItem)
      this.router.navigate(['/protein-diaas-calculator'], {fragment: 'diaasmix'});
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

  roundGreenhouseGasForMainDisplay(myNumber: number|undefined){
    return roundGreenhouseGasForMainDisplay(myNumber);
  }

}
