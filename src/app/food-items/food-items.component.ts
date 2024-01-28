import { Component, ElementRef, OnInit, ViewChild, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodItem } from '../common/food-item';
import { ScoredObject } from '../common/scored-object';
import { FoodItemsService } from './food-items.service';
import { MixComponent } from '../mix/mix.component';
import { getDiaasStyle } from '../common/common';
import { NgbTooltipModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  imports: [ CommonModule, FormsModule, NgbTooltipModule ],
  providers: [FoodItemsService],
  styleUrls: ['./food-items.component.css']
})
export class FoodItemsComponent implements OnInit {
  private modalService = inject(NgbModal);
  foodItems: FoodItem[] = [];
  foodItemDetails: FoodItem | undefined; // the foodItem currently being edited
  foodItemName = ''; // the food item name being searched
  currentMixComponent: MixComponent = MixComponent.currentMixComponent;

  constructor(private foodItemsService: FoodItemsService) {}

  @ViewChild('foodItemEditInput')
  set foodItemEditInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  ngOnInit() {
    this.getFoodItems();
  }

  getDiaasStyle(diaasScore: number, scoredObject: ScoredObject): object {
    return getDiaasStyle(diaasScore, scoredObject);
  }


  getFoodItems(): void {
    this.foodItemsService.getFoodItems()
      .subscribe(foodItems => (this.foodItems = foodItems));
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

  /*
  delete(foodItem: FoodItem): void {
    this.foodItems = this.foodItems.filter(h => h !== foodItem);
    this.foodItemsService
      .deleteFoodItem(foodItem.id)
      .subscribe();
  }
  */

  /*
  edit(foodItemName: string) {
    this.update(foodItemName);
    this.foodItemDetails = undefined;
  }
  */

  search(searchTerm: string) {
    this.foodItemDetails = undefined;
    if (searchTerm) {
      this.foodItemsService
        .searchFoodItems(searchTerm)
        .subscribe(foodItems => (this.foodItems = foodItems));
    } else {
      this.getFoodItems();
    }
  }

  /*
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
  */


  addToMix(foodItem: FoodItem): void {
    if(MixComponent.currentMixComponent){
      MixComponent.currentMixComponent.addToMix(foodItem)
    }
    else{
      console.error("internal error: MixComponent.currentMixComponent not initialized");
    }
  }

	openFoodItemDetail(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}
}
