import { Routes } from '@angular/router';
import { EUrl } from '@home/models/url.enum';

export const APP_ROUTES: Routes = [
  {
    path: '', redirectTo: EUrl.COMPONENT, pathMatch: 'full',
  },
  {
    path: EUrl.COMPONENT,
    loadChildren: () =>
      import('./components-ui/components-ui-routing.module').then(({ COMPONENT_ROUTES }) => COMPONENT_ROUTES),
  },
  {
    path: EUrl.FUNCTION,
    loadChildren: () =>
      import('./functions/functions-routing.module').then(({ FUNCTIONS_ROUTES }) => FUNCTIONS_ROUTES),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./home/components/page-not-found/page-not-found.component').then(({ PageNotFoundComponent }) => PageNotFoundComponent),
    data: { toolbar: false, footer: false }
  }
];