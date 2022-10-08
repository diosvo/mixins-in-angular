import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomButtonComponent } from '@lib/components/custom-button/custom-button.component';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatDividerModule,
    MatProgressSpinnerModule,

    CustomButtonComponent,
    CustomInputComponent,
  ],
  exports: [LoginComponent]
})
export class AuthModule { }
