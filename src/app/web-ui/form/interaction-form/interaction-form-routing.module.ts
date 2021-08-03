import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasRoleGuard } from '@lib/guards/has-role.guard';
import { IsAuthenticatedGuard } from '@lib/guards/is-authenticated.guard';
import { IsFormValidGuard } from '@lib/guards/is-form-valid.guard';
import { OrderFormComponent } from './components/order-form/order-form.component';

const routes: Routes = [
  {
    path: '',
    component: OrderFormComponent,
    canDeactivate: [IsFormValidGuard],
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data: {
      role: 'Admin',
      title: 'Order Form Features'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InteractionFormRoutingModule { }
