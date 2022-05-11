import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/list/list.module').then(({ ListModule }) => ListModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./components/details/details.module').then(({ DetailsModule }) => DetailsModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./components/details/details.module').then(({ DetailsModule }) => DetailsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudUsersRoutingModule { }
