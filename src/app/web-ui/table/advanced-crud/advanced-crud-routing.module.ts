import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedCrudComponent } from './components/advanced-crud/advanced-crud.component';

const routes: Routes = [
  {
    path: '',
    component: AdvancedCrudComponent,
    data: { title: 'Mat-table: Advanced CRUD' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancedCrudRoutingModule { }
