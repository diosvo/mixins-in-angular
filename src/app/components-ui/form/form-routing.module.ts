import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'unsaved-form',
    loadChildren: () => import('./unsaved-form/unsaved-form.module').then(({ UnsavedFormModule }) => UnsavedFormModule)
  },
  {
    path: 'lookup-users',
    loadChildren: () => import('./lookup-users/lookup-users.module').then(({ LookupUsersModule }) => LookupUsersModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
