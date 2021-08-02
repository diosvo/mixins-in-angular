import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private snackbar: SnackbarService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthorized = this.authService.user.roles.includes(route.data.role);
    if (!isAuthorized) {
      this.snackbar.warning('You are not authorized to access this page.');
    }
    return isAuthorized;
  }
}
