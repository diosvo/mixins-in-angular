import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CustomInputModule } from '../custom-input/custom-input.module';
import { CustomSelectComponent } from './custom-select.component';

@NgModule({
  declarations: [CustomSelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    CustomInputModule,

    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  exports: [CustomSelectComponent],
})
export class CustomSelectModule { }

// ref: 
// https://marselbeqiri.medium.com/angular-material-custom-mat-select-with-search-functionality-4b2b69b47511
