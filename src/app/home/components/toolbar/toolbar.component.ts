import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '@auth/components/login/login.component';
import { AuthService } from '@auth/services/auth.service';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
  isLoggedIn = true;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
  ) {
    this.authService.isLoggedIn.subscribe({
      next: (isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      }
    });
  }

  openLoginDialog(): void {
    this.dialog.open(LoginComponent);
  }

  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        header: 'logout',
        body: 'Are you sure you want to logout?',
        btnConfirm: 'confirm',
      },
      disableClose: true,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.authService.logout();
        this.router.navigate(['']);
      }
    });
  }
}
