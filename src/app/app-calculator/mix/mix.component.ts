import { Component, ElementRef, OnInit, ViewChild, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodItem } from '../common/food-item';
import { ScoredObject } from '../common/scored-object';
import { MixDIAASAndWeights, MixDetails } from './mix';
import { MixService } from './mix.service';
import { getDiaasStyle, roundOneDecimal, getScoreLetter, getScoreLetterStyle, roundGreenhouseGasRatioForMainDisplay, roundGreenhouseGasForDetailedDisplay, roundGreenhouseGasTotalForMainDisplay } from '../common/common';
import { NgbTooltipModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectModule } from 'primeng/select';
import { FoodItemDetailsComponent } from '../food-item-details/food-item-details';

@Component({
  standalone: true,
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  imports: [ 
    CommonModule, 
    FormsModule, 
    NgbTooltipModule, 
    SelectModule,
    FoodItemDetailsComponent],
  providers: [MixService],
  styleUrls: ['./mix.component.css']
})
export class MixComponent implements OnInit {
  private modalService = inject(NgbModal);
  foodItems: FoodItem[] = [];
  editFoodItemQuantity: FoodItem | undefined; // the foodItem which quantity is currently being edited
  editFoodItemProteinContent: FoodItem | undefined; // the foodItem which protein content is currently being edited
  foodItemName: string = ''; // the food item name being searched
  foodItemDetails: FoodItem | undefined; // the foodItem currently being edited
  static currentMixComponent: MixComponent;
  mixDIAASAndWeights: MixDIAASAndWeights = this.getInitialMixDIAASAndWeights();

  // sample mixes
  exampleMixes: MixDetails[] = [];
  exampleMixDetails: MixDetails = this.getInitialMixDetails();

  // Singleton stored in static currentMixComponent to be accessible globally
  constructor(private mixService: MixService) {
    if (MixComponent.currentMixComponent) {
      return MixComponent.currentMixComponent;
    }
  }

  static getCurrentMix(){
    return MixComponent.currentMixComponent;
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
    this.exampleMixes = this.mixService.getExampleMixesDetails()
  }

  ngOnDestroy(): void {
  }

  // Returns an empty mix (initially no mix is selected)
  getInitialMixDIAASAndWeights() {
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
      protein_content: 0,
      food_weight: 0,
      protein_weight: 0,
      greenhouse_gas: 0,
      greenhouse_gas_per_kg_protein: 0
    }
  }

  // Returns an empty mix (initially no mix is selected)
  getInitialMixDetails() {
    return {
      id: 0,
      name: '',
      description: '',
      recipe_link: '',
    }
  }

	openMixDetails(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'mixmodal-basic-title' });
	}
  
	openFoodItemDetails(foodItemDetails: FoodItem) {
		FoodItemDetailsComponent.getFoodItemDetailsComponent().openFoodItemDetails(foodItemDetails);
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
  

  getMix(): FoodItem[] {
    return this.foodItems;
  }


  remove(foodItem: FoodItem): void {
    this.foodItems = this.foodItems.filter(h => h !== foodItem);
    this.computeMixDiaasAndTotals();
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
      this.editFoodItemProteinContent.protein_weight = roundOneDecimal(mixProteinWeight);
      this.editFoodItemProteinContent = undefined;
      this.computeMixDiaasAndTotals();
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
      this.editFoodItemQuantity.protein_weight = roundOneDecimal(mixProteinWeight);
      this.editFoodItemQuantity = undefined;
      this.computeMixDiaasAndTotals();
    }
  }



  addToMix(foodItem: FoodItem): void {
    if(this.foodItems.indexOf(foodItem) == -1){
      foodItem.food_weight = 100;
      foodItem.protein_weight = foodItem.protein_content;
      this.foodItems.push(foodItem);
      this.computeMixDiaasAndTotals();
    }
    else{
      alert("Already in mix");
    }
  }

  // Ref: https://onlinelibrary.wiley.com/doi/full/10.1002/fsn3.1809 "2.3 DIAAS of protein mixtures"
  computeMixDiaasAndTotals(): void {
    let mixUpdated: MixDIAASAndWeights = this.getInitialMixDIAASAndWeights();
    if(this.foodItems.length != 0){
      let mixTotalProteinWeight = this.foodItems.reduce((prevVal, elem) => prevVal + elem.protein_weight, 0);
      let mixTotalFoodWeight = this.foodItems.reduce((prevVal, elem) => prevVal + elem.food_weight, 0);
  
      // Update totals
      mixUpdated.protein_weight = mixTotalProteinWeight;
      mixUpdated.food_weight = mixTotalFoodWeight;
      mixUpdated.protein_content = mixUpdated.food_weight !=0 ? roundOneDecimal(mixTotalProteinWeight/mixTotalFoodWeight*100) : 0;
  
      // Compute DIAAS and greenhouse gas
      for (let i: number = 0; i<this.foodItems.length; i++){
        //TODO handle all combinations
        if(this.foodItems[i].score_type == 'pdcaas'){
          mixUpdated.score_type = 'pdcaas';
        }
        // compute all the weighted average but will divide by total protein weight at the end
        mixUpdated.histidine_score += this.foodItems[i].histidine_score*this.foodItems[i].protein_weight;
        mixUpdated.isoleucine_score += this.foodItems[i].isoleucine_score*this.foodItems[i].protein_weight;
        mixUpdated.leucine_score += this.foodItems[i].leucine_score*this.foodItems[i].protein_weight;
        mixUpdated.lysine_score += this.foodItems[i].lysine_score*this.foodItems[i].protein_weight;
        mixUpdated.saa_score += this.foodItems[i].saa_score*this.foodItems[i].protein_weight;
        mixUpdated.aaa_score += this.foodItems[i].aaa_score*this.foodItems[i].protein_weight;
        mixUpdated.threonine_score += this.foodItems[i].threonine_score*this.foodItems[i].protein_weight;
        mixUpdated.tryptophane_score += this.foodItems[i].tryptophane_score*this.foodItems[i].protein_weight;
        mixUpdated.valine_score += this.foodItems[i].valine_score*this.foodItems[i].protein_weight;
  
        mixUpdated.greenhouse_gas += this.foodItems[i].greenhouse_gas * this.foodItems[i].food_weight;
        mixUpdated.greenhouse_gas_per_kg_protein += 100 * this.foodItems[i].greenhouse_gas / this.foodItems[i].protein_content * this.foodItems[i].protein_weight;
        
      }
  
      // divide by total protein weight
      mixUpdated.histidine_score /= mixTotalProteinWeight;
      mixUpdated.isoleucine_score /= mixTotalProteinWeight;
      mixUpdated.leucine_score /= mixTotalProteinWeight;
      mixUpdated.lysine_score /= mixTotalProteinWeight;
      mixUpdated.saa_score /= mixTotalProteinWeight;
      mixUpdated.aaa_score /= mixTotalProteinWeight;
      mixUpdated.threonine_score /= mixTotalProteinWeight;
      mixUpdated.tryptophane_score /= mixTotalProteinWeight;
      mixUpdated.valine_score /= mixTotalProteinWeight;
  
      mixUpdated.greenhouse_gas /= mixTotalFoodWeight;
      mixUpdated.greenhouse_gas_per_kg_protein /= mixTotalProteinWeight;
    }

    this.mixDIAASAndWeights = mixUpdated;
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


  roundGreenhouseGasTotalForMainDisplay(myNumber: number|undefined){
    return roundGreenhouseGasTotalForMainDisplay(myNumber);
  }

  roundGreenhouseGasForDetailedDisplay(myNumber: number|undefined){
    return roundGreenhouseGasForDetailedDisplay(myNumber);
  }

  // clear mix food items and mix details
  clearMixAll(): void {
    this.foodItems.length = 0;
    this.exampleMixDetails = this.getInitialMixDetails();
    this.computeMixDiaasAndTotals()
  }

  // clear mix food items but keep mix details
  clearMixFoodItems(): void {
    this.foodItems.length = 0;
    this.computeMixDiaasAndTotals()
  }

  loadExampleMix(): void {
    this.clearMixFoodItems()
    let lang : string|null = sessionStorage.getItem('lang');
    if(lang && lang !== 'en'){
      this.mixService
        .getExampleMixFoodJoinI18n(this.exampleMixDetails.id, lang)
        .forEach(
          (foodWithWeight) => {
            let fi: FoodItem = foodWithWeight.food;
            fi.food_weight = foodWithWeight.food_weight;
            fi.name = foodWithWeight.name_translation;
            fi.protein_weight = fi.protein_content/100*fi.food_weight;
            //console.log(fi);
            this.foodItems.push(fi);
          }
        )
      this.computeMixDiaasAndTotals()
    }
    else{
      this.mixService
        .getExampleMixFoodJoin(this.exampleMixDetails.id)
        .forEach(
          (mixFoodJoin) => {
          let fi: FoodItem = mixFoodJoin.food;
          fi.food_weight = mixFoodJoin.food_weight;
          fi.protein_weight = fi.protein_content/100*fi.food_weight;
          //console.log(fi);
          this.foodItems.push(fi);
          }
        )
        this.computeMixDiaasAndTotals()
      }
  }


}
