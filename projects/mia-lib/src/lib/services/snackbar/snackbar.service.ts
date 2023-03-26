import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '@lib/components/snackbar/snackbar.component';

export declare type MessageType = 'success' | 'info' | 'warning' | 'error';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private readonly snackbar: MatSnackBar,
  ) { }

  show(message: string): void {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 2000,
      horizontalPosition: 'right',
    });
  }
}
