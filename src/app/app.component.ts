import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  showToolbar = false;
  showFooter = false;

  constructor(
    public router: Router,
    private titleService: Title,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {
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
        next: ({ title, toolbar, footer }) => {
          this.titleService.setTitle(title);
          this.showToolbar = toolbar ?? true;
          this.showFooter = footer ?? true;
        }
      });
  }
}
