import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { UnsavedChangesDialogComponent } from './unsaved-changes-dialog.component';

@NgModule({
  declarations: [UnsavedChangesDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [UnsavedChangesDialogComponent],
})
export class UnsavedChangesDialogModule { }
