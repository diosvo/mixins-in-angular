import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/list/list.module').then(({ ListModule }) => ListModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./components/details/details.module').then(({ DetailsModule }) => DetailsModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./components/details/details.module').then(({ DetailsModule }) => DetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudUsersRoutingModule { }
