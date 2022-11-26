import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@home/components/footer/footer.component';
import { ToolbarComponent } from '@home/components/toolbar/toolbar.component';
import { ActivatedParamsService } from '@lib/services/activated-params/activated-params.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    NgIf,
    AsyncPipe,
    RouterModule,

    FooterComponent,
    ToolbarComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {

  readonly toolbar$ = new BehaviorSubject<boolean>(false);
  readonly footer$ = new BehaviorSubject<boolean>(false);

  constructor(
    protected readonly authService: AuthService,
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
