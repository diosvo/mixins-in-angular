import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from '@lib/models/base-form-component';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderFormComponent implements BaseFormComponent {
  orderForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    personalInfo: this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]]
    }),
    location: this.fb.group({
      street: [null, [Validators.required]],
      building: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zip: [null, [Validators.required]]
    })
  });

  isFormSubmitted = false;
  isFormValid = () => this.isFormSubmitted || !this.orderForm.dirty;

  constructor(
    private fb: FormBuilder
  ) { }

  onSubmit(): void {
    this.isFormSubmitted = true;
  }

  get email(): FormControl {
    return this.orderForm.get('email') as FormControl;
  }
}
