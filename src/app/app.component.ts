import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MixComponent } from './mix/mix.component';
import { FoodItemsComponent } from './food-items/food-items.component';
import { LangComponent } from './lang/lang.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    MixComponent,
    FoodItemsComponent,
    LangComponent
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
