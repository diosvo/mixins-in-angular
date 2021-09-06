import { Component, Self } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DeactivateComponent } from '@lib/models/base-form-component';
import { DetectPermissionService } from '@lib/services/detect-permission/detect-permission.service';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  providers: [DetectPermissionService]
})

export class OrderFormComponent implements DeactivateComponent {
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

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    @Self() readonly detectPermission: DetectPermissionService,
  ) { }

  canDeactivate(): boolean {
    return this.isFormSubmitted || !this.orderForm.dirty || !this.detectPermission.hasPermission;
  }

  saveChanges(): void {
    return this.onSubmit();
  }

  onSubmit(): void {
    if (this.detectPermission.hasPermission && this.orderForm.invalid) {
      this.snackbar.error('You need to provide all required information.');
      return;
    }
    if (!this.detectPermission.hasPermission) {
      this.snackbar.error('You don\'t have permission to update this form!');
      return;
    }
    this.isFormSubmitted = true;
    this.snackbar.success('Saved successfully');
  }

  get email(): FormControl {
    return this.orderForm.get('email') as FormControl;
  }
}
