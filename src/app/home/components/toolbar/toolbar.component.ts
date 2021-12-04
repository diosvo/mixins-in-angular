import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '@auth/components/login/login.component';
import { AuthService } from '@auth/services/auth.service';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { filter } from 'rxjs';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {

  constructor(
    private readonly router: Router,
    readonly authService: AuthService,
    private readonly dialog: MatDialog,
  ) { }

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '375px',
      disableClose: true,
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
}
