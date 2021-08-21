import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'order-form',
    loadChildren: () => import('./interaction-form/interaction-form.module').then(m => m.InteractionFormModule)
  },
  {
    path: 'unsaved-form',
    loadChildren: () => import('./unsaved-form/unsaved-form.module').then(m => m.UnsavedFormModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
