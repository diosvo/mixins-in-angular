import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'advanced-crud',
    loadChildren: () => import('./advanced-crud/advanced-crud.module').then(m => m.AdvancedCrudModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
