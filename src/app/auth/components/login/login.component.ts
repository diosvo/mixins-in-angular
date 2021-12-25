import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';

@Component({
  selector: 'dv-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['diosvo', Validators.required],
    password: ['123456', Validators.required]
  });

  hidePassword = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly snackbar: SnackbarService
  ) { }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.snackbar.success('Login successfully!'),
      error: () => this.snackbar.error('Something went wrong. Please try again!')
    });
  }
}
