import { Routes } from '@angular/router';
import { EComponentUI } from '@home/models/url.enum';
import { CanLoadGuard } from '@lib/guards/can-load.guard';
import { IsAuthenticatedGuard } from '@lib/guards/is-authenticated.guard';

export const COMPONENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./list-component-ui.component')
      .then(({ ListComponentUiComponent }) => ListComponentUiComponent),
    title: 'Components'
  },
  {
    path: EComponentUI.CARD,
    loadChildren: () => import('./card/card-routing.module').then(({ CARD_ROUTES }) => CARD_ROUTES)
  },
  {
    path: EComponentUI.MENU,
    loadChildren: () => import('./menu/menu-routing.module').then(({ MENU_ROUTES }) => MENU_ROUTES)
  },
  {
    path: EComponentUI.TABLE,
    loadChildren: () => import('./table/table-routing.module').then(({ TABLE_ROUTES }) => TABLE_ROUTES)
  },
  {
    path: EComponentUI.FORM,
    loadChildren: () => import('./form/form-routing.module').then(({ FORM_ROUTES }) => FORM_ROUTES),
    canActivate: [IsAuthenticatedGuard],
    canLoad: [CanLoadGuard]
  }
];
