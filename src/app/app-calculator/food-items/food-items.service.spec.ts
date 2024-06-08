import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { FoodItem } from '../common/food-item';
import { FoodItemsService } from './food-items.service';
import { HttpErrorHandler } from '../../http-error-handler.service';
import { MessageService } from '../../message.service';

describe('FoodItemsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let foodItemService: FoodItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test and its dependencies
      providers: [
        FoodItemsService,
        HttpErrorHandler,
        MessageService
      ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    foodItemService = TestBed.inject(FoodItemsService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// foodItemService method tests begin ///
/*
  describe('#getFoodItems', () => {
    let expectedFoodItems: FoodItem[];

    beforeEach(() => {
      foodItemService = TestBed.inject(FoodItemsService);
      expectedFoodItems = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
       ] as FoodItem[];
    });

    it('should return expected foodItems (called once)', () => {

      foodItemService.getFoodItems().subscribe({
        next: foodItems => expect(foodItems).toEqual(expectedFoodItems, 'should return expected foodItems'),
        error: fail,
      });

      // FoodItemService should have made one request to GET foodItems from expected URL
      const req = httpTestingController.expectOne(foodItemService.foodItemsUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock foodItems
      req.flush(expectedFoodItems);
    });

    it('should be OK returning no foodItems', () => {

      foodItemService.getFoodItems().subscribe({
        next: foodItems => expect(foodItems.length).toEqual(0, 'should have empty foodItems array'),
        error: fail,
      });

      const req = httpTestingController.expectOne(foodItemService.foodItemsUrl);
      req.flush([]); // Respond with no foodItems
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty foodItems result', () => {

      foodItemService.getFoodItems().subscribe({
        next: foodItems => expect(foodItems.length).toEqual(0, 'should return empty foodItems array'),
        error: fail,
      });

      const req = httpTestingController.expectOne(foodItemService.foodItemsUrl);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

  });
*/

  describe('#updateFoodItem', () => {
    // Expecting the query form of URL so should not 404 when id not found
    const makeUrl = (id: number) => `${foodItemService.foodItemsUrl}/?id=${id}`;

    /*
    it('should update a foodItem and return it', () => {

      const updateFoodItem: FoodItem = { id: 1, name: 'A' };

      foodItemService.updateFoodItem(updateFoodItem).subscribe({
        next: data => expect(data).toEqual(updateFoodItem, 'should return the foodItem'),
        error: fail,
      });

      // FoodItemService should have made one request to PUT foodItem
      const req = httpTestingController.expectOne(foodItemService.foodItemsUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateFoodItem);

      // Expect server to return the foodItem after PUT
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: updateFoodItem });
      req.event(expectedResponse);
    });
    */

    /*
    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 error into return of the update foodItem', () => {
      const updateFoodItem: FoodItem = { id: 1, name: 'A' };

      foodItemService.updateFoodItem(updateFoodItem).subscribe({
        next: data => expect(data).toEqual(updateFoodItem, 'should return the update foodItem'),
        error: fail,
      });

      const req = httpTestingController.expectOne(foodItemService.foodItemsUrl);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });*/
  });

  // TODO: test other FoodItemService methods
});
