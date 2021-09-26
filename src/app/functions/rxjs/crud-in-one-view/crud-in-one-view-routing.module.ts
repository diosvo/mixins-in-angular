import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudInOneViewComponent } from './crud-in-one-view.component';

const routes: Routes = [
  {
    path: '',
    component: CrudInOneViewComponent,
    data: {
      title: 'CRUD in one view'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudInOneViewRoutingModule { }
