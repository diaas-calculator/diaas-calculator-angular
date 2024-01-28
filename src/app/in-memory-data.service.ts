import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const foodItems = [
      { id: 1, name: 'Egg' },
      { id: 2, name: 'Oats' },
    ];
    const query = [
      { name: '@angular/core', version: '20.1.0', description: 'angular core package' },
      { name: '@angular/common', version: '20.1.0', description: 'angular common package' },
      { name: '@angular/material', version: '20.1.5', description: 'angular material package' },
    ];
    return {foodItems, query};
  }
}
