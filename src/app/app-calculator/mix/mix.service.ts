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

  getExampleMixFoodJoin(mixId: number): MixFoodJoin[] {
    return this.mockComponent.getExampleMixFoodJoin(mixId)
  }

  getExampleMixFoodJoinI18n(mixId: number, lang: string): MixFoodJoinI18n[] {
    return this.mockComponent.getExampleMixFoodJoinI18n(mixId, lang)
  }



}
