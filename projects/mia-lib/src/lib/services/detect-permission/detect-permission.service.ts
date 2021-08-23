import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class DetectPermissionService {
  hasPermission: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.isAuthorized();
  }

  isAuthorized(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(_ => this.activatedRoute),
        mergeMap(route => route.data)
      )
      .subscribe({
        next: ({ roles }) => {
          if (!this.authService.user) return false;

          const checkRole = (role: string) => roles.includes(role);
          this.hasPermission = this.authService.user.roles.some(checkRole);
        }
      });
  }
}
