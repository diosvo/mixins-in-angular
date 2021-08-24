import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogPart } from './confirm-dialog.model';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [`
    .dialog-title {
      margin-bottom: 0.5rem;
    }

    .dialog-actions {
      padding: 0.5rem 0 1rem;
    }

    .close-button {
      margin: -1rem -1rem 0 0;
    }
  `]
})
export class ConfirmDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { dialogPart: IDialogPart }
  ) { }
}
