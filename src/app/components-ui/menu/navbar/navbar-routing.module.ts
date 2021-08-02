import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    data: { title: 'Navbar Interaction' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavbarRoutingModule { }
