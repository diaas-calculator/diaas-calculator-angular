import {Routes} from '@angular/router';

// lazy loaded components
export const MenuRoutes: Routes = [
  {
    path: 'protein-diaas-and-carbon-footprint-calculator',
    loadComponent: () =>
      import('../app-calculator/app.calculator.component').then((x) => x.AppCalculatorComponent),
  },
  {
    path: 'diaas-information',
    loadComponent: () =>
      import('../diaas-info/diaas-info.component').then((x) => x.DiaasInfoComponent),
  },
  {
    path: 'protein-information',
    loadComponent: () =>
      import('../protein-info/protein-info.component').then((x) => x.ProteinInfoComponent),
  },
  {
    path: 'protein-carbon-footprint-information',
    loadComponent: () =>
      import('../carbon-footprint-info/carbon-footprint-info.component').then((x) => x.CarbonFootprintInfoComponent),
  },
  {
    path: 'user-manual',
    loadComponent: () =>
      import('../user-manual/user-manual.component').then((x) => x.UserManualComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('../about/about.component').then((x) => x.AboutComponent),
  },
  {path: '',   redirectTo: '/protein-diaas-and-carbon-footprint-calculator', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('../page-not-found/page-not-found.component').then((x) => x.PageNotFoundComponent),
  },
];
