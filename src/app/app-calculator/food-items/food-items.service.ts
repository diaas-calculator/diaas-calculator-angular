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
  // URL to web api
  foodItemsUrl = environment.apiUrl + '/food'; 
  foodItemsUrlI18n = environment.apiUrl + '/food_i18n';
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
    return this.mockComponent.searchFoodItems(foodNameFilter, foodTypeFilter, aaProfileFilter, showHidden);
  }

  /* GET foodItems whose name contains search term with a translation */
  searchFoodItemsI18n(foodNameFilter: string, foodTypeFilter: string, aaProfileFilter: string, lang: string, showHidden: string): Observable<(FoodItem|FoodItemTranslation)[][]> {
      const options = this.buildHttpParamsOptions(foodNameFilter, foodTypeFilter, aaProfileFilter, lang, showHidden)
        
      const url = `${this.foodItemsUrlI18n}/search/`
      /*
      //debug
      this.http.get<ResultsI18n<FoodItemI18n>>(url, options)
        .pipe(map(resI18n => resI18n.results))
        .pipe(
          tap( res => console.log('after results:', res))
        )
        .subscribe()
        */

      return this.http.get<(FoodItem|FoodItemTranslation)[][]>(url, options)
        .pipe(
          catchError(this.handleError<(FoodItem|FoodItemTranslation)[][]>('searchFoodItemsI18n', []))
        );
        
    }

    buildHttpParamsOptions(foodNameFilter: string, foodTypeFilter: string, aaProfileFilter: string, lang: string, showHidden: string): object{
      foodNameFilter = foodNameFilter.trim();
      // Add safe, URL encoded search parameter if there is a filter
      let options;
      if(foodNameFilter || foodTypeFilter || lang || showHidden){
        let myParams: HttpParams = new HttpParams()
        if(foodNameFilter){
          myParams = myParams.append('name', foodNameFilter);
        }
        if(foodTypeFilter && foodTypeFilter != "all"){
          myParams = myParams.append('food_type', foodTypeFilter);
        }
        if(aaProfileFilter && aaProfileFilter != "all"){
          myParams = myParams.append('aa_profile', aaProfileFilter);
        }
        if(lang){
          myParams = myParams.append('lang', lang);
        }
        if(showHidden){
          myParams = myParams.append('show_hidden', showHidden);
        }

        options = 
        { 
          params: myParams 
        };
      }
      else{
        options = {};
      }

      return options;
    }


}
