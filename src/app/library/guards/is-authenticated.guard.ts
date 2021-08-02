import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private snackbar: SnackbarService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
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
