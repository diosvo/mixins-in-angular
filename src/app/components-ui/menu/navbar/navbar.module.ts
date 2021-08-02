import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarRoutingModule } from './navbar-routing.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    NavbarRoutingModule
  ],
  exports: [RouterModule]
})
export class NavbarModule { }
