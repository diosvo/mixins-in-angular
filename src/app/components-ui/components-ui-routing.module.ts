import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EComponentUI } from '../home/models/url.enum';
import { ListComponentUiComponent } from './list-component-ui.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponentUiComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsUiRoutingModule { }
