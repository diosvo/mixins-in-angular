import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '@auth/components/login/login.component';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { mockSnackbar } from '@lib/services/snackbar/snackbar.service.spec';
import { of, throwError } from 'rxjs';
import { ToolbarComponent } from './toolbar.component';

const info = {
  username: 'diosvo',
  password: '123456'
};

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;

  const mockRouter: any = {
    navigateByUrl: jest.fn()
  };

  const mockDialog: any = {
    open: jest.fn()
  };

  const mockService: any = {
    login: jest.fn().mockReturnValue(of(info)),
    logout: jest.fn()
  };

  beforeEach(() => {
    component = new ToolbarComponent(
      mockRouter,
      mockService,
      mockDialog,
      mockSnackbar
    );
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('openLoginDialog()', () => {
    jest.spyOn(component as any, 'login');
    jest.spyOn(mockDialog, 'open').mockReturnValue({
      afterClosed: () => of(info)
    } as MatDialogRef<typeof ToolbarComponent>);

    component.openLoginDialog();

    expect(mockDialog.open).toBeCalledWith(LoginComponent, {
      width: '400px',
      disableClose: true,
    });
    expect(component['login']).toBeCalledWith(info);
  });

  describe('openLogoutDialog()', () => {
    afterEach(() => {
      expect(mockDialog.open).toBeCalledWith(ConfirmDialogComponent, {
        data: {
          header: 'logout',
          body: 'Are you sure you want to logout?',
          btnClose: false
        },
        width: '400px',
        disableClose: true,
      });
    });

    test('should call logout method when the user clicks on Logout button', () => {
      jest.spyOn(mockDialog, 'open').mockReturnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<typeof ToolbarComponent>);
      component.openLogoutDialog();

      expect(mockService.logout).toBeCalled();
      expect(mockRouter.navigateByUrl).toBeCalledWith('/components');
    });

    test('should close the dialog if the user clicks on Close button', () => {
      jest.spyOn(mockDialog, 'open').mockReturnValue({
        afterClosed: () => of(false)
      } as MatDialogRef<typeof ToolbarComponent>);
      component.openLogoutDialog();
    });
  });

  describe('login()', () => {
    test('should show success message when login successfully', () => {
      component['login'](info);
      expect(mockSnackbar.success).toBeCalledWith('Login successfully!');
    });

    test('should show error message when login fail', () => {
      mockService.login.mockReturnValue(throwError(() => new Error('Something went wrong. Please try again!')));
      component['login'](info);
      expect(mockSnackbar.error).toBeCalledWith('Something went wrong. Please try again!');
    });
  });
});
