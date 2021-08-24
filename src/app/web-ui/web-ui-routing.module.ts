import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListWebUiComponent } from './list-web-ui.component';

const routes: Routes = [
  {
    path: '',
    component: ListWebUiComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebUiRoutingModule { }
