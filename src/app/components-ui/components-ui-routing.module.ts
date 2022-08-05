import { Routes } from '@angular/router';
import { EComponentUI } from '@home/models/url.enum';
import { CanLoadGuard } from '@lib/guards/can-load.guard';
import { IsAuthenticatedGuard } from '@lib/guards/is-authenticated.guard';
import { ListComponentUiComponent } from './list-component-ui.component';

export const COMPONENT_ROUTES: Routes = [
  {
    path: '',
    component: ListComponentUiComponent,
    title: 'Components'
  },
  {
    path: EComponentUI.BUTTON,
    loadChildren: () => import('./button/button-routing.module').then(({ BUTTON_ROUTES }) => BUTTON_ROUTES)
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
    loadChildren: () => import('./form/form.module').then(({ FormModule }) => FormModule),
    canActivate: [IsAuthenticatedGuard],
    canLoad: [CanLoadGuard]
  }
];
