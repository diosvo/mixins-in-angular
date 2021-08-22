import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { InteractionFormRoutingModule } from './interaction-form-routing.module';

@NgModule({
  declarations: [
    OrderFormComponent
  ],
  imports: [
    CommonModule,
    InteractionFormRoutingModule,

    MatIconModule,
    MatButtonModule,
    CustomInputModule,
    ReactiveFormsModule,
  ]
})
export class InteractionFormModule { }
