import {Routes} from '@angular/router';

// lazy loaded components
export const MenuRoutes: Routes = [
  {
    path: 'protein-diaas-calculator',
    loadComponent: () =>
      import('../app-calculator/app.calculator.component').then((x) => x.AppCalculatorComponent),
  },
  {
    path: 'diaas-information',
    loadComponent: () =>
      import('../diaas-info/diaas-info.component').then((x) => x.DiaasInfoComponent),
  },
  {path: '',   redirectTo: '/protein-diaas-calculator', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('../page-not-found/page-not-found.component').then((x) => x.PageNotFoundComponent),
  },
];
