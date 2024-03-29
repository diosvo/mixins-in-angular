import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { TRole } from '@lib/models/role';

@Injectable()
export class DetectPermissionService {
  hasPermission: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.isAuthorized();
  }

  isAuthorized(): void {
    this.activatedRoute.data.subscribe({
      next: ({ roles }) => {
        if (!this.authService.user) {
          return false;
        };

        const checkRole = (role: TRole) => this.authService.user.roles.includes(role);
        this.hasPermission = roles.some(checkRole);
      }
    });
  }
}
