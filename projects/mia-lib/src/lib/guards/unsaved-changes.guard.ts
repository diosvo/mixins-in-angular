import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate, GuardsCheckEnd, Router } from '@angular/router';
import { UnsavedChangesDialogComponent } from '@lib/components/unsaved-changes-dialog/unsaved-changes-dialog.component';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { Observable, of } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';

export interface DeactivateComponent {
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
    private readonly destroy$: DestroyService
  ) { }

  canDeactivate(component: DeactivateComponent): Observable<boolean> {
    if (!component.canDeactivate()) {
      const dialogRef = this.dialog.open(UnsavedChangesDialogComponent, {
        width: '400px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe({
        next: (response: boolean) => {
          if (response === false) {
            this.router.events
              .pipe(
                filter((event): event is GuardsCheckEnd => event instanceof GuardsCheckEnd),
                take(1),
                takeUntil(this.destroy$)
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

    // No pending changes, else show confirm dialog.
    return of(true);
  }
}
