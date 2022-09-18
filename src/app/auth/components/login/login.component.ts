import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@auth/services/auth.service';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import isEqual from 'lodash.isequal';
import { BehaviorSubject, catchError, EMPTY, finalize, Observable, take } from 'rxjs';

enum EMode {
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot_password',
}

type TMode = Lowercase<keyof typeof EMode>

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  form = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  });
  hidePassword = true;

  loading: boolean;
  readonly mode = EMode;
  mode$ = new BehaviorSubject<TMode>(EMode.LOGIN);

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: AuthService,
    private readonly snackbar: SnackbarService,
    private readonly dialogRef: MatDialogRef<LoginComponent>
  ) { }

  login(): void {
    this.mode$.next(EMode.LOGIN);
  }

  register(): void {
    this.mode$.next(EMode.REGISTER);
  }

  forgotPassword(): void {
    this.mode$.next(EMode.FORGOT_PASSWORD);
  }

  onAction(): void {
    let action$: Observable<void>;

    this.loading = true;
    this.form.disable();
    const { email, password } = this.form.value;

    switch (this.mode$.value) {
      case this.mode.REGISTER: {
        action$ = this.service.emailRegister({ email, password });
        break;
      }
      case this.mode.LOGIN: {
        action$ = this.service.emailSignIn({ email, password });
        break;
      }
      case this.mode.FORGOT_PASSWORD: {
        action$ = this.service.resetPassword(password);
        break;
      }
    }

    action$
      .pipe(
        take(1),
        catchError(({ message }) => {
          this.snackbar.error(message);
          return EMPTY;
        }),
        finalize(() => {
          this.form.enable();
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          if (isEqual(this.mode$.value, EMode.REGISTER)) {
            return this.login();
          }
          this.dialogRef.close();
        },
        error: ({ message }) => this.snackbar.error(message)
      });
  }

  googleSignIn(): void {
    this.loading = true;
    this.service.googleSignIn().subscribe({
      next: () => this.dialogRef.close()
    });
  }
}