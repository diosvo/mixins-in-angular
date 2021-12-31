import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedParamsService } from '@lib/services/activated-params/activated-params.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  showToolbar$ = new BehaviorSubject<boolean>(false);
  showFooter$ = new BehaviorSubject<boolean>(false);

  constructor(
    readonly authService: AuthService,
    private readonly titleService: Title,
    private readonly route: ActivatedParamsService
  ) {
    this.route.dataMap$.subscribe({
      next: ({ title, toolbar, footer }) => {
        this.titleService.setTitle(title);
        this.showToolbar$.next(toolbar ?? true);
        this.showFooter$.next(footer ?? true);
      }
    });
  }
}
