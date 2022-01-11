import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '@auth/components/login/login.component';
import { AuthService } from '@auth/services/auth.service';
import { EUrl } from '@home/models/url.enum';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { filter } from 'rxjs';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {

  navigation = Object.values(EUrl);

  constructor(
    private readonly router: Router,
    readonly authService: AuthService,
    private readonly dialog: MatDialog,
    private readonly snackbar: SnackbarService,
  ) { }

  openLoginDialog(): void {
    this.dialog
      .open(LoginComponent, {
        width: '375px',
        disableClose: true,
      })
      .afterClosed()
      .pipe(filter(info => !!info))
      .subscribe(data => this.login(data));
  }

  openLogoutDialog(): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          header: 'logout',
          body: 'Are you sure you want to logout?',
          btnClose: false
        },
        width: '425px',
        disableClose: true,
      })
      .afterClosed()
      .pipe(filter(result => result))
      .subscribe(() => {
        this.authService.logout();
        this.router.navigate(['/ui-components']);
      });
  }

  private login(info: { username: string, password: string }): void {
    this.authService.login(info).subscribe({
      next: () => this.snackbar.success('Login successfully!'),
      error: () => this.snackbar.error('Something went wrong. Please try again!')
    });
  }
}
