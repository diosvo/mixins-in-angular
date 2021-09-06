import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['diosvo', Validators.required],
    password: ['123456', Validators.required]
  });

  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) { }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.snackbar.success('Login successfully!'),
      error: () => this.snackbar.error('Something went wrong. Please try again!')
    });
  }

  get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
