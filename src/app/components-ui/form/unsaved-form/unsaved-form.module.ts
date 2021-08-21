import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
import { UnsavedFormComponent } from './components/unsaved-form/unsaved-form.component';
import { UnsavedFormRoutingModule } from './unsaved-form-routing.module';

@NgModule({
  declarations: [UnsavedFormComponent],
  imports: [
    CommonModule,
    UnsavedFormRoutingModule,

    MatButtonModule,
    CustomInputModule,
    ReactiveFormsModule,
  ]
})
export class UnsavedFormModule { }
