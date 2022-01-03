import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate, GuardsCheckEnd, Router } from '@angular/router';
import { UnsavedChangesDialogComponent } from '@lib/components/unsaved-changes-dialog/unsaved-changes-dialog.component';
import { Observable, of } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { DeactivateComponent } from '../models/base-form-component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<DeactivateComponent> {

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }

  canDeactivate(component: DeactivateComponent): Observable<boolean> {
    if (!component.canDeactivate()) {
      const dialogRef = this.dialog.open(UnsavedChangesDialogComponent, {
        width: '500px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe((response: boolean) => {
        if (response === false) {
          this.router.events
            .pipe(
              filter((event): event is GuardsCheckEnd => event instanceof GuardsCheckEnd),
              take(1)
            )
            .subscribe({
              next: (router: GuardsCheckEnd) => component.saveChanges(router.urlAfterRedirects)
            });
        }
      });

      return dialogRef.afterClosed().pipe(
        map((result: boolean) => result)
      );
    }

    // No pending changes, else show confirm dialog.
    return of(true);
  }
}
