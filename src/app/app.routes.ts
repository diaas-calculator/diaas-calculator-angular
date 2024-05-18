import {RouterModule, Routes} from '@angular/router';



export const AppRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./menu/menu.routes').then((x) => x.MenuRoutes),
  }
];
