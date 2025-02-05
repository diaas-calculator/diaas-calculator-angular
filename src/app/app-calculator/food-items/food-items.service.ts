import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, catchError, map } from 'rxjs';
//import {tap} from 'rxjs/operators';

import { FoodItem, FoodItemTranslation } from '../common/food-item';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

import { environment } from '../../../environments/environment';
import { MockComponent } from '../../mock/mock.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class FoodItemsService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private mockComponent: MockComponent
    ) {
      this.handleError = httpErrorHandler.createHandleError('FoodItemsService')
  }

  /* GET foodItems whose name contains search term */
  searchFoodItems(foodNameFilter: string, foodTypeFilter: string, aaProfileFilter: string, showHidden: string): FoodItem[] {
    return this.mockComponent.searchFoodItems(foodNameFilter, foodTypeFilter, aaProfileFilter, showHidden)
  }

  /* GET foodItems whose name contains search term with a translation */
  searchFoodItemsI18n(foodNameFilter: string, foodTypeFilter: string, aaProfileFilter: string, lang: string, showHidden: string): (FoodItem|FoodItemTranslation)[][] {
    return this.mockComponent.searchFoodItemsI18n(foodNameFilter, foodTypeFilter, aaProfileFilter, lang, showHidden)
    }



}
