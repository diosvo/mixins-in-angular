import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '@auth/components/login/login.component';
import { AuthService } from '@auth/services/auth.service';
import { EUrl } from '@home/models/url.enum';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { filter, take } from 'rxjs';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {

  readonly navigation = Object.values(EUrl);

  constructor(
    private readonly router: Router,
    readonly authService: AuthService,
    private readonly dialog: MatDialog,
  ) { }

  openLoginDialog(): void {
    this.dialog
      .open(LoginComponent, {
        width: '400px',
        disableClose: true,
      })
      .afterClosed()
      .pipe(filter(info => !!info))
      .subscribe({
        next: (info) => this.login(info)
      });
  }

  openLogoutDialog(): void {
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

  private login({ email, password }): Promise<void> {
    return this.authService.login({ email, password });
  }
}
