import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,

    CustomButtonModule,
    CustomInputComponent,
  ],
  exports: [LoginComponent]
})
export class AuthModule { }
