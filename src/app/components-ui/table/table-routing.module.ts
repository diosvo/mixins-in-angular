import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'multiple-checkbox-filter',
    loadChildren: () => import('./multiple-checkbox-filter/multiple-checkbox-filter.module').then(m => m.MultipleCheckboxFilterModule)
  },
  {
    path: 'advanced-crud',
    loadChildren: () => import('./advanced-crud/advanced-crud.module').then(m => m.AdvancedCrudModule)
  },
  {
    path: 'crud-users',
    loadChildren: () => import('./crud-users/crud-users.module').then(m => m.CrudUsersModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
