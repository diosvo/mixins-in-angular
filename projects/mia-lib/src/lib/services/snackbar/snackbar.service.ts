import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from '@lib/components/snackbar/snackbar.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService implements OnDestroy {
  private dismissed$ = new Subject<boolean>();
  private destroyed$ = new Subject<boolean>();

  private config: MatSnackBarConfig = {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  };

  constructor(
    private readonly snackbar: MatSnackBar,
  ) { }

  success(message: string): void {
    this.show(message, 'alert-success');
  }

  warning(message: string): void {
    this.show(message, 'alert-warning');
  }

  error(message: string): void {
    this.show(message, 'alert-error');
  }

  private show(message: string, panelClasses?: string | Array<string>): void {
    this.snackbar.openFromComponent(SnackbarComponent, {
      ...this.config,
      data: message,
      panelClass: panelClasses
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
