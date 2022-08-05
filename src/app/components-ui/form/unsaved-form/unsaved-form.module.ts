import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HasPermissionDirective } from '@auth/utils/has-permission.directive';
import { AlertComponent } from '@lib/components/alert/alert.component';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { UnsavedFormComponent } from './components/unsaved-form/unsaved-form.component';
import { UnsavedFormRoutingModule } from './unsaved-form-routing.module';

@NgModule({
  declarations: [UnsavedFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UnsavedFormRoutingModule,

    AlertComponent,
    CustomInputComponent,
    HasPermissionDirective,

    MatButtonModule,
  ]
})
export class UnsavedFormModule { }
