import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class DetectPermissionService {
  hasPermission: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.isAuthorized();
  }

  isAuthorized(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(_ => this.activatedRoute),
        mergeMap(({ data }) => data)
      )
      .subscribe({
        next: ({ roles }) => {
          if (!this.authService.user) return false;

          const checkRole = (role: string) => this.authService.user.roles.includes(role);
          this.hasPermission = roles.some(checkRole);
        }
      });
  }
}
