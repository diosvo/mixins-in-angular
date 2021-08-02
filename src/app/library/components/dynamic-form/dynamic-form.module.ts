import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DynamicFormComponent } from './dynamic-form.component';

@NgModule({
  declarations: [
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  exports: [DynamicFormComponent]
})
export class DynamicFormModule { }
