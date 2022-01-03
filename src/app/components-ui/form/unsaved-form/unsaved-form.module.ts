import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HasPermissionDirectiveModule } from '@auth/utils/has-permission.directive';
import { AlertModule } from '@lib/components/alert/alert.module';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
import { UnsavedFormComponent } from './components/unsaved-form/unsaved-form.component';
import { UnsavedFormRoutingModule } from './unsaved-form-routing.module';

@NgModule({
  declarations: [UnsavedFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UnsavedFormRoutingModule,

    AlertModule,
    CustomInputModule,
    HasPermissionDirectiveModule,

    MatButtonModule,
  ]
})
export class UnsavedFormModule { }
