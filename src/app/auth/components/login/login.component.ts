import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    private readonly fb: FormBuilder
  ) { }
}
