import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './components/data-table/data-table.component';

const routes: Routes = [
  {
    path: '',
    component: DataTableComponent,
    data: {
      title: 'Multiple/ Checkbox Filter'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultipleCheckboxSearchRoutingModule { }
