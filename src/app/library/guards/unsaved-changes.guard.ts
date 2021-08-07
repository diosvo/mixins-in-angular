import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import { UnsavedChangesDialogComponent } from '@lib/components/unsaved-changes-dialog/unsaved-changes-dialog.component';
import { DeactivateComponent } from '../models/base-form-component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<DeactivateComponent> {
  constructor(private dialog: MatDialog) { }

  canDeactivate(
    component: DeactivateComponent): boolean {
    if (component.canDeactivate()) {
      return true;
    }
    else {
      const dialogRef = this.dialog.open(UnsavedChangesDialogComponent, {
        width: '500px',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(response => {
        if (!!response) {
          component.onSave();
        } else {
          console.log('false');
        }
      });
    }
  }
}
