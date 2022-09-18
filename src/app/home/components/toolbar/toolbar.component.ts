import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthModule } from '@auth/auth.module';
import { LoginComponent } from '@auth/components/login/login.component';
import { AuthService } from '@auth/services/auth.service';
import { EUrl } from '@home/models/url.enum';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { CustomButtonComponent } from '@lib/components/custom-button/custom-button.component';
import { TrackByKeyDirective } from '@lib/directives/track-by-key.directive';
import { filter, take } from 'rxjs';

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    AuthModule,
    TrackByKeyDirective,
    CustomButtonComponent,
    ConfirmDialogComponent,

    MatToolbarModule
  ],
  templateUrl: './toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {

  readonly loggedIn$ = this.authService.isLoggedIn$;
  readonly navigation = Object.values(EUrl);

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
  ) { }

  onLogin(): void {
    this.dialog.open(LoginComponent, {
      width: '450px',
    });
  }

  onLogout(): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          header: 'logout',
          body: 'Are you sure you want to logout?',
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
}
