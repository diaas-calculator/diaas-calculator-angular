import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, catchError, map } from 'rxjs';

import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { FoodItem } from '../common/food-item';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

// Not used currently but will be probably required in the future
@Injectable()
export class MixService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('MixService');
  }



}
