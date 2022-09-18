import { Routes } from '@angular/router';
import { EFunctions } from '../home/models/url.enum';

export const FUNCTIONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./list-functions.component')
      .then(({ ListFunctionsComponent }) => ListFunctionsComponent),
    title: 'Functions',
  },
  {
    path: EFunctions.RXJS,
    loadChildren: () => import('./rxjs/rxjs-routing.module').then(({ RXJS_ROUTES }) => RXJS_ROUTES)
  },
];
