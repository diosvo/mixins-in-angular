import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '@auth/services/auth.service';
import { CustomButtonComponent } from '@lib/components/custom-button/custom-button.component';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { LazyImageDirective } from '@lib/directives/lazy-image.directive';
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
  standalone: true,
  imports: [
    NgIf,
    NgSwitch,
    NgSwitchCase,
    ReactiveFormsModule,

    MatDialogModule,
    MatDividerModule,
    MatProgressSpinnerModule,

    LazyImageDirective,
    CustomInputComponent,
    CustomButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
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
    this.loading = true;
    this.form.disable();

    this.executeJob$()
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
        }
      });
  }

  private executeJob$(): Observable<void> {
    const { email, password } = this.form.value;

    switch (this.mode$.value) {
      case this.mode.REGISTER: {
        return this.service.emailRegister({ email, password });
      }
      case this.mode.LOGIN: {
        return this.service.emailSignIn({ email, password });
      }
      case this.mode.FORGOT_PASSWORD: {
        return this.service.resetPassword(email);
      }
    }
  }

  googleSignIn(): void {
    this.loading = true;
    Object.keys(this.form.value).forEach((key: string) => {
      this.form.get(key).clearValidators();
      this.form.get(key).updateValueAndValidity();
    });

    this.service.googleSignIn()
      .pipe(
        take(1),
        catchError(({ message }) => {
          this.snackbar.error(message);
          return EMPTY;
        }),
        finalize(() => this.dialogRef.close())
      )
      .subscribe({
        next: () => this.dialogRef.close()
      });
  }
}