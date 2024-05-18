import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MixComponent } from './mix/mix.component';
import { FoodItemsComponent } from './food-items/food-items.component';
import { LangComponent } from './lang/lang.component';

@Component({
  standalone: true,
  selector: 'app-calculator',
  templateUrl: './app.calculator.component.html',
  imports: [
    CommonModule,
    MixComponent,
    FoodItemsComponent,
    LangComponent
  ],
  styleUrls: ['./app.calculator.component.css']
})
export class AppCalculatorComponent {
}
