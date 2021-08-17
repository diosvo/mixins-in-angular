import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate, GuardsCheckEnd, Router } from '@angular/router';
import { UnsavedChangesDialogComponent } from '@lib/components/unsaved-changes-dialog/unsaved-changes-dialog.component';
import { Observable, of, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { DeactivateComponent } from '../models/base-form-component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<DeactivateComponent> {

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) { }

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
          this.router.events
            .pipe(
              filter(event => event instanceof GuardsCheckEnd),
              take(1)
            )
            .subscribe({
              next: (router: GuardsCheckEnd) => component.saveBeforeDeactivate(router.urlAfterRedirects)
            });
        }
        return;
      });
      return dialogRef.afterClosed();
    }
    return of(true);
  }
}
