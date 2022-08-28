import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HasPermissionDirective } from '@auth/utils/has-permission.directive';
import { AlertComponent } from '@lib/components/alert/alert.component';
import { ButtonLoaderIconDirective } from '@lib/components/custom-button/button-loader-icon.directive';
import { CustomButtonComponent } from '@lib/components/custom-button/custom-button.component';
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
    CustomButtonComponent,
    HasPermissionDirective,
    ButtonLoaderIconDirective,
  ]
})
export class UnsavedFormModule { }
