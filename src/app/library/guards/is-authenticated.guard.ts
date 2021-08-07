import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private snackbar: SnackbarService
  ) { }

  canActivate(): Observable<boolean> {
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
