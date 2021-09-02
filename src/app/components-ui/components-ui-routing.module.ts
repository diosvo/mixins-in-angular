import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadGuard } from '@lib/guards/can-load.guard';
import { IsAuthenticatedGuard } from '@lib/guards/is-authenticated.guard';
import { ListComponentUiComponent } from './list-component-ui.component';
import { EComponentUI } from '@home/models/url.enum';

const routes: Routes = [
  {
    path: '',
    component: ListComponentUiComponent,
    data: { title: 'Components' }
  },
  {
    path: EComponentUI.BUTTON,
    loadChildren: () => import('./button/button.module').then(m => m.ButtonModule)
  },
  {
    path: EComponentUI.CARD,
    loadChildren: () => import('./card/card.module').then(m => m.CardModule)
  },
  {
    path: EComponentUI.MENU,
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)
  },
  {
    path: EComponentUI.TABLE,
    loadChildren: () => import('./table/table.module').then(m => m.TableModule)
  },
  {
    path: EComponentUI.FORM,
    loadChildren: () => import('./form/form.module').then(m => m.FormModule),
    canActivate: [IsAuthenticatedGuard],
    canLoad: [CanLoadGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsUiRoutingModule { }
