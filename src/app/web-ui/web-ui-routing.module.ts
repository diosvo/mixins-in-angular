import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadGuard } from '@lib/guards/can-load.guard';
import { IsAuthenticatedGuard } from '@lib/guards/is-authenticated.guard';
import { EWebUI } from '../home/models/url.enum';
import { ListWebUiComponent } from './list-web-ui.component';

const routes: Routes = [
  {
    path: '',
    component: ListWebUiComponent,
  },
  {
    path: EWebUI.TABLE,
    loadChildren: () => import('./table/table.module').then(m => m.TableModule)
  },
  {
    path: EWebUI.FORM,
    loadChildren: () => import('./form/form.module').then(m => m.FormModule),
    canActivate: [IsAuthenticatedGuard],
    canLoad: [CanLoadGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebUiRoutingModule { }
