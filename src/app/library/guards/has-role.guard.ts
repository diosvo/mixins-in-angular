import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private snackbar: SnackbarService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const isAuthorized = this.authService.user.roles.includes(route.data.role);
    if (!isAuthorized) {
      this.snackbar.warning('You are not authorized to access this page.');
    }
    return isAuthorized;
  }
}
