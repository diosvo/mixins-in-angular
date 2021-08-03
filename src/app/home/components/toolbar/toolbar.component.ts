import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '@auth/components/login/login.component';
import { AuthService } from '@auth/services/auth.service';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { IMenu } from '../../models/search.model';
import { EMenuLink, EUrl } from '../../models/url.enum';


@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
  isLoggedIn = true;

  menuList: Array<IMenu> = [
    {
      name: EMenuLink.COMPONENT,
      route: EUrl.COMPONENT,
      active: false
    },
    {
      name: EMenuLink.WEB,
      route: EUrl.WEB,
      active: false
    },
    {
      name: EMenuLink.FUNCTION,
      route: EUrl.FUNCTION,
      active: false
    }
  ];

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
    this.menuList = this.checkActivePage(window.location.pathname.split('/')[1]);

    this.authService.isLoggedIn.subscribe({
      next: (isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      }
    });
  }

  onDirect(route: string): void {
    this.menuList = this.checkActivePage(route);
    this.router.navigate([route]);
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

  private checkActivePage(route: string): Array<IMenu> {
    return this.menuList.map(item => ({ ...item, active: item.route === route ? true : false }));
  }
}
