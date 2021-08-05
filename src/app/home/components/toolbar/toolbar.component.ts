import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '@auth/components/login/login.component';
import { AuthService } from '@auth/services/auth.service';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { IMenu } from '../../models/search.model';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
  @Input() options: Array<IMenu>;
  @Output() directMenu = new EventEmitter();

  isLoggedIn = true;

  constructor(
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
        return this.authService.logout();
      }
    });
  }
}
