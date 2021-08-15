import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import { UnsavedChangesDialogComponent } from '@lib/components/unsaved-changes-dialog/unsaved-changes-dialog.component';
import { Observable, of, Subject } from 'rxjs';
import { DeactivateComponent } from '../models/base-form-component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<DeactivateComponent> {

  constructor(private dialog: MatDialog) { }

  canDeactivate(
    component: DeactivateComponent
  ): Observable<boolean> {
    if (!component.canDeactivate()) {
      const dialogRef = this.dialog.open(UnsavedChangesDialogComponent, {
        width: '500px',
        disableClose: true
      });

      const subject = new Subject<boolean>();
      dialogRef.componentInstance.subject = subject;

      subject.subscribe((response) => {
        if (response) {
          component.saveBeforeDeactivate();
        }
      });
      return dialogRef.afterClosed();
    }
    return of(true);
  }
}
