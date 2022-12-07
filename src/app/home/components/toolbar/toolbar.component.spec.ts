import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '@auth/components/login/login.component';
import { ConfirmDialogComponent, Dialog } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { of } from 'rxjs';
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

  const mockLoadingService: any = {
    loading$: of(false),
  };

  beforeEach(() => {
    component = new ToolbarComponent(
      mockRouter,
      mockDialog,
      mockService,
      mockLoadingService
    );
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('onLogin()', () => {
    component.onLogin();
    expect(mockDialog.open).toBeCalledWith(LoginComponent, {
      width: '450px',
    });
  });

  describe('onLogout()', () => {
    afterEach(() => {
      expect(mockDialog.open).toBeCalledWith(ConfirmDialogComponent, {
        data: <Dialog>{
          title: 'logout',
          content: 'Are you sure you want to logout?',
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
      component.onLogout();

      expect(mockService.logout).toBeCalled();
      expect(mockRouter.navigateByUrl).toBeCalledWith('/components-ui');
    });

    test('should close the dialog if the user clicks on Close button', () => {
      jest.spyOn(mockDialog, 'open').mockReturnValue({
        afterClosed: () => of(false)
      } as MatDialogRef<typeof ToolbarComponent>);
      component.onLogout();
    });
  });
});
