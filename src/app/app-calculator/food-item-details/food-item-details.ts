import { Component, Injectable, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { NgbModal, NgbModalRef, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'
import { FoodItem } from '../common/food-item';
import { roundGreenhouseGasForDetailedDisplay } from '../common/common';
import { DEFAULT_GREENHOUSE_GAS_LINK } from '../common/constants';

@Component({
    standalone: true,
    selector: 'food-item-details',
    templateUrl: './food-item-details.html',
    imports: [ 
        NgbTooltipModule
    ],
    styleUrls: ['./food-item-details.css']
})
@Injectable()
export class FoodItemDetailsComponent implements OnInit {
    static foodItemDetailsComponent: FoodItemDetailsComponent;
    foodItemDetails: FoodItem | undefined;
    @ViewChild('fooditemdetailsmodal') private modalContent: TemplateRef<FoodItemDetailsComponent> | undefined
    private modalRef: NgbModalRef | undefined
    constructor(private modalService: NgbModal) { 
        if (FoodItemDetailsComponent.foodItemDetailsComponent) {
            return FoodItemDetailsComponent.foodItemDetailsComponent;
          }
    }

    ngOnInit(): void { 
        if (!FoodItemDetailsComponent.foodItemDetailsComponent) {
            FoodItemDetailsComponent.foodItemDetailsComponent = this;
          }
    }

    static getFoodItemDetailsComponent() : FoodItemDetailsComponent{
        return FoodItemDetailsComponent.foodItemDetailsComponent;
      }

    openFoodItemDetails(foodItemDetails: FoodItem) {
        this.foodItemDetails = foodItemDetails;
        this.modalService.open(this.modalContent, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    }

    getGreenhouseGasLink() : String{
        if(this.foodItemDetails){
            return this.foodItemDetails.greenhouse_gas_link ? this.foodItemDetails.greenhouse_gas_link : DEFAULT_GREENHOUSE_GAS_LINK
        }
        else{
            return "";
        }
    }

    roundGreenhouseGasForDetailedDisplay(myNumber: number|undefined){
        return roundGreenhouseGasForDetailedDisplay(myNumber);
      }

}