import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/list/list.module').then(m => m.ListModule)
  },
  {
    path: 'details/:user_id',
    loadChildren: () => import('./components/update/update.module').then(m => m.UpdateModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./components/create/create.module').then(m => m.CreateModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudUsersRoutingModule { }