import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, catchError, map } from 'rxjs';

import { FoodItem, Results } from '../common/food-item';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class FoodItemsService {
  foodItemsUrl = environment.apiUrl + '/food';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('FoodItemsService');
  }

  /** List foodItems from the server */
  getFoodItems(): Observable<FoodItem[]> {
    return this.http.get<Results<FoodItem>>(this.foodItemsUrl)
      //TODO error handling?
      .pipe(map(obj => obj.results))
      .pipe(
        catchError(this.handleError('getFoodItems', []))
      );
  }

  /* GET foodItems whose name contains search term */
  searchFoodItems(term: string): Observable<FoodItem[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};
    const url = `${this.foodItemsUrl}/search/`
    return this.http.get<Results<FoodItem>>(url, options)
      //TODO error handling?
      .pipe(map(obj => obj.results))
      .pipe(
        catchError(this.handleError<FoodItem[]>('searchFoodItems', []))
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
