import { Component } from '@angular/core';
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
    private readonly route: ActivatedParamsService
  ) {
    this.route.dataMap$.subscribe({
      next: ({ toolbar, footer }) => {
        this.showToolbar$.next(toolbar ?? true);
        this.showFooter$.next(footer ?? true);
      }
    });
  }
}
