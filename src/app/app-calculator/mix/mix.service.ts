import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, catchError, map } from 'rxjs';

import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { FoodItem } from '../common/food-item';
import { environment } from '../../../environments/environment';
import { MixFoodJoin, MixFoodJoinI18n, MixDetails } from './mix';
import { MockComponent } from '../../mock/mock.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class MixService {
  // URL to web api for mix with all food items
  mixWithFoodUrl = environment.apiUrl + '/mix-with-food'; 
  // URL to web api for mix with all food items with internationalization
  mixWithFoodI18nUrl = environment.apiUrl + '/mix-with-food-i18n'; 
  // URL to web api for mix details (without food items)
  mixDetailsUrl = environment.apiUrl + '/mix'; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private mockComponent: MockComponent) {
    this.handleError = httpErrorHandler.createHandleError('MixService');
  }

  
  getExampleMixesDetails(): MixDetails[] {
    return this.mockComponent.getExampleMixesDetails()
  }

  getExampleMixFoodJoin(mixId: number): Observable<MixFoodJoin[]> {
    const options = {}
    
    const url = `${this.mixWithFoodUrl}/${mixId}`
    return this.http.get<MixFoodJoin[]>(url, options)
      .pipe(
        catchError(this.handleError<MixFoodJoin[]>('getExampleMixFoodJoin', []))
      );
  }

  getExampleMixFoodJoinI18n(mixId: number, lang: string): Observable<MixFoodJoinI18n[]> {
    let myParams: HttpParams = new HttpParams();
    myParams = myParams.append('lang', lang);
    const options = 
    { 
      params: myParams 
    };
    
    const url = `${this.mixWithFoodI18nUrl}/${mixId}`
    return this.http.get<MixFoodJoinI18n[]>(url, options)
      .pipe(
        catchError(this.handleError<MixFoodJoinI18n[]>('getExampleMixFoodJoinI18n', []))
      );
  }



}
