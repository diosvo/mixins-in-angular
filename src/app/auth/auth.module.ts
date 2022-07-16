import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
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

    CustomInputModule,
    CustomButtonModule,
  ],
  exports: [LoginComponent]
})
export class AuthModule { }
