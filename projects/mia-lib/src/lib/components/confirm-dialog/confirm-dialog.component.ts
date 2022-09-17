import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: {
      header: string;
      body: string;
      btnClose?: boolean;
    }
  ) { }
}
