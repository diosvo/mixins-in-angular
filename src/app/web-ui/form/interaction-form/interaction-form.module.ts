import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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

    FormsModule,
    ReactiveFormsModule,
    CustomInputModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class InteractionFormModule { }
