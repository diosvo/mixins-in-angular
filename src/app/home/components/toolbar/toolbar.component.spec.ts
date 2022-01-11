import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth/auth.module';
import { LoginComponent } from '@auth/components/login/login.component';
import { AuthService } from '@auth/services/auth.service';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModule } from '@lib/components/confirm-dialog/confirm-dialog.module';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { of, throwError } from 'rxjs';
import { ToolbarComponent } from './toolbar.component';

const snackbar = {
  success: jest.fn(),
  error: jest.fn()
};

const login_values = {
  username: 'diosvo',
  password: '123456'
};

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let dialog: MatDialog;

  const service = {
    login: jest.fn().mockReturnValue(of(login_values)),
    logout: jest.fn()
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {
            path: 'ui-components',
            component: ToolbarComponent
          }
        ]),

        AuthModule,
        CustomButtonModule,
        ConfirmDialogModule,

        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        MatToolbarModule,
      ],
      providers: [
        {
          provide: MatDialog,
          useValue: { open: jest.fn() }
        },
        {
          provide: AuthService,
          useValue: service
        },
        {
          provide: SnackbarService,
          useValue: snackbar
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('openLoginDialog()', () => {
    jest.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of(login_values)
    } as MatDialogRef<typeof ToolbarComponent>);
    component.openLoginDialog();
    expect(dialog.open).toBeCalledWith(LoginComponent, {
      width: '375px',
      disableClose: true,
    });
  });

  describe('openLogoutDialog() when user clicks on', () => {
    test('Logout button', () => {
      jest.spyOn(dialog, 'open').mockReturnValue({
        afterClosed: () => of(true)
      } as MatDialogRef<typeof ToolbarComponent>);
      jest.spyOn(component['router'], 'navigate');
      jest.spyOn(component['authService'], 'logout');

      component.openLogoutDialog();

      expect(dialog.open).toBeCalledWith(ConfirmDialogComponent, {
        data: {
          header: 'logout',
          body: 'Are you sure you want to logout?',
          btnClose: false
        },
        width: '425px',
        disableClose: true,
      });
      expect(component['authService'].logout).toBeCalled();
      expect(component['router'].navigate).toBeCalledWith(['/core']);
    });

    test('Cancel button', () => {
      jest.spyOn(dialog, 'open').mockReturnValue({
        afterClosed: () => of(false)
      } as MatDialogRef<typeof ToolbarComponent>);
      component.openLogoutDialog();
      expect(dialog.open).toBeCalledWith(ConfirmDialogComponent, {
        data: {
          header: 'logout',
          body: 'Are you sure you want to logout?',
          btnClose: false
        },
        width: '425px',
        disableClose: true,
      });
    });
  });

  describe('login() to login and the API returns', () => {
    test('success', () => {
      component['login'](login_values);
      expect(snackbar.success).toBeCalledWith('Login successfully!');
    });

    test('error', () => {
      service.login.mockReturnValue(throwError(() => new Error('Something went wrong. Please try again!')));
      component['login'](login_values);
      expect(snackbar.error).toBeCalledWith('Something went wrong. Please try again!');
    });
  });
});
