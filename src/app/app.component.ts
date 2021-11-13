import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  showToolbar$ = new BehaviorSubject<boolean>(false);
  showFooter$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly router: Router,
    readonly authService: AuthService,
    private readonly titleService: Title,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(_ => this.activatedRoute),
        map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(({ data }) => data)
      )
      .subscribe({
        next: ({ title, toolbar, footer }) => {
          this.titleService.setTitle(title);
          this.showToolbar$.next(toolbar ?? true);
          this.showFooter$.next(footer ?? true);
        }
      });
  }
}
