import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { LoggerService } from '@lib/services/log/logger.service';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanLoadGuard implements CanLoad {
  constructor(
    private logger: LoggerService,
    private authService: AuthService,
    private snackbar: SnackbarService,
  ) { }

  canLoad(): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      tap({
        next: (isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            this.logger.warn('CanLoadGuard');
            this.snackbar.warning('You must log in first');
          }
        }
      })
    );
  }
}
