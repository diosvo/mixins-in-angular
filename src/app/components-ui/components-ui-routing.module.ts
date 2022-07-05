import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EComponentUI } from '@home/models/url.enum';
import { CanLoadGuard } from '@lib/guards/can-load.guard';
import { IsAuthenticatedGuard } from '@lib/guards/is-authenticated.guard';
import { ListComponentUiComponent } from './list-component-ui.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponentUiComponent,
    title: 'Components'
  },
  {
    path: EComponentUI.BUTTON,
    loadChildren: () => import('./button/button.module').then(({ ButtonModule }) => ButtonModule)
  },
  {
    path: EComponentUI.CARD,
    loadChildren: () => import('./card/card.module').then(({ CardModule }) => CardModule)
  },
  {
    path: EComponentUI.MENU,
    loadChildren: () => import('./menu/menu.module').then(({ MenuModule }) => MenuModule)
  },
  {
    path: EComponentUI.TABLE,
    loadChildren: () => import('./table/table.module').then(({ TableModule }) => TableModule)
  },
  {
    path: EComponentUI.FORM,
    loadChildren: () => import('./form/form.module').then(({ FormModule }) => FormModule),
    canActivate: [IsAuthenticatedGuard],
    canLoad: [CanLoadGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ComponentsUiRoutingModule { }
