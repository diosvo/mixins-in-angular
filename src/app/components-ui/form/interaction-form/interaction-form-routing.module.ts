import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasRoleGuard } from '@lib/guards/has-role.guard';
import { UnsavedChangesGuard } from '@lib/guards/unsaved-changes.guard';
import { ERole } from '@lib/models/role';
import { OrderFormComponent } from './components/order-form/order-form.component';

const routes: Routes = [
  {
    path: '',
    component: OrderFormComponent,
    canDeactivate: [UnsavedChangesGuard],
    canActivate: [HasRoleGuard],
    data: {
      roles: [ERole.ADMIN, ERole.CUSTOMER],
      title: 'Order Form Features'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InteractionFormRoutingModule { }
