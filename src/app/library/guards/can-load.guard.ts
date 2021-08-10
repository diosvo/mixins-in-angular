import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanLoadGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private snackbar: SnackbarService
  ) { }

  canLoad(): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      tap({
        next: (isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            this.snackbar.warning('You must log in first');
          }
        }
      })
    );
  }
}
