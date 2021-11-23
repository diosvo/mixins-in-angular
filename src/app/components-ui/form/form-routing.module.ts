import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'unsaved-form',
    loadChildren: () => import('./unsaved-form/unsaved-form.module').then(({ UnsavedFormModule }) => UnsavedFormModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
