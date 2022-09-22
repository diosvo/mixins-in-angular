import { FormBuilder } from '@angular/forms';
import { mockSnackbar } from '@lib/services/snackbar/snackbar.service.spec';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';

const auth = {
  email: 'vtmn1212@gmail.com',
  password: '123456'
};

describe('LoginComponent', () => {
  let component: LoginComponent;

  const mockAuthService: any = {
    emailRegister: jest.fn().mockReturnValue(of(auth)),
    emailSignIn: jest.fn().mockReturnValue(of(auth)),
    resetPassword: jest.fn().mockReturnValue(of(auth)),
    googleSignIn: jest.fn().mockReturnValue(of(auth)),
  };

  const mockDialogRef: any = {
    close: jest.fn()
  };

  beforeEach(() => {
    component = new LoginComponent(
      new FormBuilder(),
      mockAuthService,
      mockSnackbar,
      mockDialogRef
    );
    jest.spyOn(component.mode$, 'next');
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should change to login mode', () => {
    component.login();
    expect(component.mode$.next).toBeCalledWith('login');
  });

  test('should change to register mode', () => {
    component.register();
    expect(component.mode$.next).toBeCalledWith('register');
  });

  test('should change to forgot password mode', () => {
    component.forgotPassword();
    expect(component.mode$.next).toBeCalledWith('forgot_password');
  });

  describe('onAction()', () => {
    beforeEach(() => {
      jest.spyOn(component as any, 'executeJob$').mockReturnValue(of({}));
    });

    test('should close the dialog if login successfully', () => {
      component.mode$.next('login');
      component.onAction();
      expect(mockDialogRef.close).toBeCalled();
    });

    test('should move to login page after sign in successfully', () => {
      component.mode$.next('register');
      component.onAction();
      expect(component.mode$.next).toBeCalledWith('login');
    });

    test('should show error message when any error occurred', () => {
      component.mode$.next('login');
      jest.spyOn(component as any, 'executeJob$').mockReturnValue(throwError(() => new Error('Bad Request')));

      component.onAction();
      expect(mockSnackbar.error).toBeCalledWith('Bad Request');
    });
  });

  describe('executeJob$()', () => {
    beforeEach(() => {
      component.form.setValue(auth);
    });

    test('should call sign in method', (done) => {
      component.mode$.next('register');
      component['executeJob$']().subscribe(() => {
        expect(mockAuthService.emailRegister).toBeCalledWith(auth);
        done();
      });
    });

    test('should call login in method', (done) => {
      component.mode$.next('login');
      component['executeJob$']().subscribe(() => {
        expect(mockAuthService.emailSignIn).toBeCalledWith(auth);
        done();
      });
    });

    test('should call forgot password method', (done) => {
      component.mode$.next('forgot_password');
      component['executeJob$']().subscribe(() => {
        expect(mockAuthService.resetPassword).toBeCalledWith(auth.email);
        done();
      });
    });
  });

  describe('googleSignIn()', () => {
    test('should clear and update validity', () => {
      component.form.patchValue({ email: auth.email });
      jest.spyOn(component.form.get('email'), 'clearValidators');
      jest.spyOn(component.form.get('email'), 'updateValueAndValidity');

      component.googleSignIn();

      expect(component.form.get('email').clearValidators).toBeCalled();
      expect(component.form.get('email').updateValueAndValidity).toBeCalled();
    });

    test('should close dialog if sign in by google successfully', () => {
      component.form.setValue(auth);
      component.googleSignIn();
      expect(mockDialogRef.close).toBeCalled();
    });

    test('should show error message when any error occurred', () => {
      mockAuthService.googleSignIn = jest.fn().mockReturnValue(throwError(() => new Error('Bad Request')));
      component.googleSignIn();
      expect(mockSnackbar.error).toBeCalledWith('Bad Request');
    });
  });
});
