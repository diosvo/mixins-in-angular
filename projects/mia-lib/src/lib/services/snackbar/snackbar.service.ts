import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from '@lib/components/snackbar/snackbar.component';
import { Observable, race, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private alertDismissed$: Subject<null> = new Subject<null>();
  private hostComponentDestroyed$: Subject<null> = new Subject<null>();

  private config: MatSnackBarConfig = {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  };

  constructor(
    private readonly zone: NgZone,
    private readonly snackbar: MatSnackBar,
  ) { }

  success(message: string): void {
    return this.show(message, 'alert-success');
  }

  warning(message: string): void {
    return this.show(message, 'alert-warning');
  }

  error(message: string): void {
    return this.show(message, 'alert-error');
  }

  private show(message: string, panelClasses?: string | Array<string>): void {
    const dismissConditions: Observable<any>[] = [this.alertDismissed$, this.hostComponentDestroyed$];

    this.zone.run(() => {
      const snackbar = this.snackbar.openFromComponent(SnackbarComponent, {
        ...this.config,
        data: message,
        panelClass: panelClasses
      });

      race(...dismissConditions)
        .pipe(take(1))
        .subscribe({
          complete: () => snackbar.dismiss()
        });
    });
  }
}
