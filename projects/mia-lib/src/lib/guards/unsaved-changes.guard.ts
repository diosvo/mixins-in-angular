import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate, GuardsCheckEnd, Router } from '@angular/router';
import { UnsavedChangesDialogComponent } from '@lib/components/unsaved-changes-dialog/unsaved-changes-dialog.component';
import { untilDestroy } from '@lib/helpers/until-destroy';
import isEqual from 'lodash.isequal';
import { Observable, of } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

export interface DeactivateComponent {
  internalNavigation?: boolean;
  canDeactivate: () => boolean;
  saveChanges: (url: string) => void;
}

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard implements CanDeactivate<DeactivateComponent> {

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) { }

  canDeactivate(component: DeactivateComponent): Observable<boolean> {
    if (!component.canDeactivate() && !component.internalNavigation) {
      const dialogRef = this.dialog.open(UnsavedChangesDialogComponent, {
        width: '400px',
        disableClose: true
      });

      dialogRef.afterClosed()
        .pipe(
          filter((action: unknown) => !isEqual(action, 'close') && !isEqual(action, true)),
          take(1),
          untilDestroy()
        )
        .subscribe({
          next: () => {
            this.router.events
              .pipe(
                filter((event): event is GuardsCheckEnd => event instanceof GuardsCheckEnd),
                take(1),
                untilDestroy()
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
