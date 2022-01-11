import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from '@lib/components/confirm-dialog/confirm-dialog.module';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    CustomButtonModule,
    ConfirmDialogModule,

    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  exports: [ToolbarComponent],
  providers: [FormBuilder]
})
export class ToolbarModule { }
