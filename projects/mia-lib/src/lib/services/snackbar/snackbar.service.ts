import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from '@lib/components/snackbar/snackbar.component';
import { MessageType } from '@lib/models/alert';
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

  private type: MessageType;

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
    this.type = 'success';
    return this.show(message, SnackbarService.getStyles(this.type));
  }

  info(message: string): void {
    this.type = 'info';
    return this.show(message, SnackbarService.getStyles(this.type));
  }

  warning(message: string): void {
    this.type = 'warning';
    return this.show(message, SnackbarService.getStyles(this.type));
  }

  error(message: string): void {
    this.type = 'error';
    return this.show(message, SnackbarService.getStyles(this.type));
  }

  private show(message: string, panelClasses: Array<string>): void {
    this.alertMessage$.next(message);
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

  private static getStyles(type: MessageType): Array<string> {
    return [`bg-${ type }`, `bd-${ type }`];
  }
}
