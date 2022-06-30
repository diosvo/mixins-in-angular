import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

enum EMode {
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot_password',
}

type TMode = Lowercase<keyof typeof EMode>

@Component({
  selector: 'dv-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  form = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  });
  hidePassword = true;

  mode = EMode;
  mode$ = new BehaviorSubject<TMode>(EMode.LOGIN);

  constructor(
    private readonly fb: FormBuilder,
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
}