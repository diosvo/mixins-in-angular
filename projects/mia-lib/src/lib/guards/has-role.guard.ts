import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly snackbar: SnackbarService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const checkRole = (role: string) => this.authService.user.roles.includes(role);
    const isAuthorized = route.data.roles.some(checkRole);

    if (!isAuthorized) {
      this.snackbar.warning('You are not authorized to access this page.');
    }
    return isAuthorized;
  }
}
