import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { LoggerFactory } from '@lib/helpers/logger.factory';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  private logger = this.loggerFactory.createLogger('IsAuthenticatedGuard', 'auth');

  constructor(
    private readonly authService: AuthService,
    private readonly snackbar: SnackbarService,
    private readonly loggerFactory: LoggerFactory,
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      tap({
        next: (isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            this.logger.log('activated');
            this.snackbar.warning('You must log in first');
          }
        }
      })
    );
  }
}
