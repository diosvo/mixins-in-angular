import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsavedChangesGuard } from '@lib/guards/unsaved-changes.guard';
import { OrderFormComponent } from './components/order-form/order-form.component';

const routes: Routes = [
  {
    path: '',
    component: OrderFormComponent,
    canDeactivate: [UnsavedChangesGuard],
    // canActivate: [HasRoleGuard],
    data: {
      role: ['Admin'],
      title: 'Order Form Features'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InteractionFormRoutingModule { }
