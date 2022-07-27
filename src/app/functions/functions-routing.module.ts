import { Routes } from '@angular/router';
import { EFunctions } from '../home/models/url.enum';
import { ListFunctionsComponent } from './list-functions.component';

export const FUNCTIONS_ROUTES: Routes = [
  {
    path: '',
    component: ListFunctionsComponent,
    title: 'Functions'
  },
  {
    path: EFunctions.RXJS,
    loadChildren: () => import('./rxjs/rxjs-routing.module').then(({ RXJS_ROUTES }) => RXJS_ROUTES)
  },
];
