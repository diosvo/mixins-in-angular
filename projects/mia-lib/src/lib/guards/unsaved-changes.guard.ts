import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate, GuardsCheckEnd, Router } from '@angular/router';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { Observable, of } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { UnsavedChangesDialogComponent } from '../components/unsaved-changes-dialog/unsaved-changes-dialog.component';

export interface DeactivateComponent {
  internalNavigation?: boolean;
  canDeactivate: () => boolean;
  saveChanges: (url: string) => void;
  discardChanges?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<DeactivateComponent> {

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly destroy$: DestroyService
  ) { }

  canDeactivate(component: DeactivateComponent): Observable<boolean> {
    if (!component.canDeactivate() && !component.internalNavigation) {
      const dialogRef = this.dialog.open(UnsavedChangesDialogComponent, {
        width: '500px',
        disableClose: true
      });

      dialogRef.afterClosed()
        .pipe(
          take(1),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (discard: boolean) => {
            if (discard) {
              component.discardChanges();
            } else {
              this.router.events
                .pipe(
                  filter((event): event is GuardsCheckEnd => event instanceof GuardsCheckEnd),
                  take(1)
                )
                .subscribe({
                  next: (router: GuardsCheckEnd) => component.saveChanges(router.urlAfterRedirects)
                });
            }
          }
        });

      return dialogRef.afterClosed().pipe(
        map((result: boolean) => result)
      );
    }

    // If there has no changes, else show dialog
    return of(true);
  }
}
