import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unsaved-changes-dialog',
  templateUrl: './unsaved-changes-dialog.component.html',
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

export class UnsavedChangesDialogComponent {
  constructor(
    readonly location: LocationStrategy,
    private dialog: MatDialogRef<UnsavedChangesDialogComponent>,
  ) { 
    location.onPopState(() => this.dialog.close());
  }
}
