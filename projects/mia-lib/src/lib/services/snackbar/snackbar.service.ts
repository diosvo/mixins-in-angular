import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from '@lib/components/snackbar/snackbar.component';
import { Observable, race, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private alertMessage$: Subject<string> = new Subject<string>();
  private alertDismissed$: Subject<null> = new Subject<null>();
  private hostComponentDestroyed$: Subject<null> = new Subject<null>();

  private get alert$(): Observable<string> {
    return this.alertMessage$.asObservable();
  }

  private config: MatSnackBarConfig = {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  };

  constructor(
    private snackbar: MatSnackBar,
    private zone: NgZone
  ) { }

  success(message: string): void {
    return this.show(message);
  }

  info(message: string): void {
    return this.show(message);
  }

  warning(message: string): void {
    return this.show(message);
  }

  error(message: string): void {
    return this.show(message);
  }

  private show(message: string): void {
    this.alertMessage$.next(message);
    const dismissConditions: Observable<any>[] = [this.alertDismissed$, this.hostComponentDestroyed$];

    this.zone.run(() => {
      const snackbar = this.snackbar.openFromComponent(SnackbarComponent, {
        ...this.config,
        data: message,
      });

      race(...dismissConditions)
        .pipe(take(1))
        .subscribe({
          complete: () => snackbar.dismiss()
        });
    });
  }
}
