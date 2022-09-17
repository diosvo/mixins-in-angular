import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedParamsService } from '@lib/services/activated-params/activated-params.service';
import { LoadingService } from '@lib/services/loading/loading.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {

  readonly toolbar$ = new BehaviorSubject<boolean>(false);
  readonly footer$ = new BehaviorSubject<boolean>(false);

  constructor(
    readonly authService: AuthService,
    readonly loaderService: LoadingService,
    private readonly route: ActivatedParamsService,
  ) {
    this.route.dataMap$.subscribe({
      next: ({ toolbar, footer }) => {
        this.toolbar$.next(toolbar ?? true);
        this.footer$.next(footer ?? true);
      }
    });
  }
}
