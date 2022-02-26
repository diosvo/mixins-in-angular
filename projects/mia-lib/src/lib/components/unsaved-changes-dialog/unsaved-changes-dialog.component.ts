import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'unsaved-changes-dialog',
  templateUrl: './unsaved-changes-dialog.component.html'
})

export class UnsavedChangesDialogComponent {
  constructor(
    private readonly location: LocationStrategy,
    private readonly dialog: MatDialogRef<UnsavedChangesDialogComponent>,
  ) {
    this.location.onPopState(() => this.dialog.close());
  }
}
