import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, catchError, map } from 'rxjs';

import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { FoodItem } from '../common/food-item';
import { environment } from '../../../environments/environment';
import { MixFoodJoin, MixDetails } from './mix';

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
  // URL to web api for mix details (without food items)
  mixDetailsUrl = environment.apiUrl + '/mix'; 
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('MixService');
  }

  
  getExampleMixesDetails(): Observable<MixDetails[]> {
    const options = {}
    
    const url = `${this.mixDetailsUrl}/list/`
    return this.http.get<MixDetails[]>(url, options)
      .pipe(
        catchError(this.handleError<MixDetails[]>('getExampleMixesDetails'))
      );
  }

  getExampleMixFoodJoin(mixId: number): Observable<MixFoodJoin[]> {
    const options = {}
    
    const url = `${this.mixWithFoodUrl}/${mixId}`
    return this.http.get<MixFoodJoin[]>(url, options)
      .pipe(
        catchError(this.handleError<MixFoodJoin[]>('getExampleMixFoodJoin', []))
      );
  }



}
