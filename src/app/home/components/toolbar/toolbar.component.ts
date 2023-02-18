import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '@auth/components/login/login.component';
import { AuthService } from '@auth/services/auth.service';
import { EUrl } from '@home/models/url.enum';
import { ConfirmDialogComponent, Dialog } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { CustomButtonComponent } from '@lib/components/custom-button/custom-button.component';
import { LazyImageDirective } from '@lib/directives/lazy-image.directive';
import { TrackByKeyDirective } from '@lib/directives/track-by-key.directive';
import { LoadingService } from '@lib/services/loading/loading.service';
import { filter, take } from 'rxjs';

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [
    /* @angular */
    NgIf,
    NgForOf,
    AsyncPipe,
    RouterModule,
    /* @angular */
    LoginComponent,
    LazyImageDirective,
    TrackByKeyDirective,
    CustomButtonComponent,
    ConfirmDialogComponent,
    /* @material */
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressBarModule
  ],
  templateUrl: './toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {

  readonly user$ = this.authService.user$;
  readonly loggedIn$ = this.authService.isLoggedIn$;
  readonly navigation = [
    {
      display_name: 'Components',
      path: EUrl.COMPONENT
    },
    {
      display_name: 'Functions',
      path: EUrl.FUNCTION
    }
  ];

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
    protected readonly loaderService: LoadingService
  ) { }

  onLogin(): void {
    this.dialog.open(LoginComponent, {
      width: '450px',
    });
  }

  onLogout(): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: <Dialog>{
          title: 'logout',
          content: 'Are you sure you want to logout?',
          btnClose: false
        },
        width: '400px',
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((ok: boolean) => ok),
        take(1)
      )
      .subscribe({
        next: () => {
          this.authService.logout();
          this.router.navigateByUrl('/components-ui');
        }
      });
  }

  updateProfile(): void {
    console.log(this.authService.user);
  }
}
