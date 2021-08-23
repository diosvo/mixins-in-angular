import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
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
        map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe({
        next: ({ role }) => {
          if (!this.authService.user) return false;
          role.forEach((element: string) => {
            return this.hasPermission = this.authService.user.roles.includes(element);
          });
        }
      });
  }
}
