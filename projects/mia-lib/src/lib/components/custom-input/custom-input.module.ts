import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomButtonModule } from '../custom-button/custom-button.module';
import { CustomInputComponent } from './custom-input.component';

@NgModule({
  declarations: [CustomInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    CustomButtonModule,

    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [CustomInputComponent]
})
export class CustomInputModule { }
