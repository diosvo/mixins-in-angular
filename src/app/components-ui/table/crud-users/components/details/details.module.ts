import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
import { DetailsComponent } from './details.component';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    CustomInputModule,
    ReactiveFormsModule,

    MatChipsModule,
    MatFormFieldModule
  ],
  exports: [DetailsComponent],
})
export class DetailsModule { }
