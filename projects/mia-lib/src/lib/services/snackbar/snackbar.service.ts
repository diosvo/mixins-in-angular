import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from '@lib/components/snackbar/snackbar.component';

export declare type MessageType = 'success' | 'info' | 'warning' | 'error';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

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
}
