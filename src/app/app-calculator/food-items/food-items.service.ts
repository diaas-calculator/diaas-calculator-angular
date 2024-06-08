import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, catchError, map } from 'rxjs';
//import {tap} from 'rxjs/operators';

import { FoodItem, FoodItemTranslation } from '../common/food-item';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

import { environment } from '../../../environments/environment';

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
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('FoodItemsService');
  }

  /* GET foodItems whose name contains search term */
  searchFoodItems(term: string): Observable<FoodItem[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};
    
    
    const url = `${this.foodItemsUrl}/search/`
    return this.http.get<FoodItem[]>(url, options)
      .pipe(
        catchError(this.handleError<FoodItem[]>('searchFoodItems', []))
      );
  }

    /* GET foodItems whose name contains search term with a translation */
     searchFoodItemsI18n(term: string, lang: string): Observable<(FoodItem|FoodItemTranslation)[][]> {
      term = term.trim();
  
      // Add safe, URL encoded search parameter if there is a search term
      const options = term ?
        { 
          params: new HttpParams()
            .set('name', term)
            .set('lang', lang)
        } : 
        { 
          params: new HttpParams()
            .set('lang', lang)
        };
      
        
      const url = `${this.foodItemsUrlI18n}/search/`
      /*
      //debug
      console.log("appel get")
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


  //////// Save methods //////////

  /** POST: add a new foodItem to the database */
  addFoodItem(foodItem: FoodItem): Observable<FoodItem> {
    return this.http.post<FoodItem>(this.foodItemsUrl, foodItem, httpOptions)
      .pipe(
        catchError(this.handleError('addFoodItem', foodItem))
      );
  }

  /** DELETE: delete the foodItem from the server */
  deleteFoodItem(id: number): Observable<unknown> {
    const url = `${this.foodItemsUrl}/${id}`; // DELETE api/food/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteFoodItem'))
      );
  }

  /** PUT: update the foodItem on the server. Returns the updated foodItem upon success. */
  updateFoodItem(foodItem: FoodItem): Observable<FoodItem> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
    
    const url = `${this.foodItemsUrl}/${foodItem.id}`; // PUT api/food/42
    return this.http.put<FoodItem>(url, foodItem, httpOptions)
      .pipe(
        catchError(this.handleError('updateFoodItem', foodItem))
      );
  }

}
