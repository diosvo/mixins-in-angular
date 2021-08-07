import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DeactivateComponent } from '@lib/models/base-form-component';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
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
  ) { }

  canDeactivate = () => this.isFormSubmitted || !this.orderForm.dirty;

  onSave(): void {
    return this.snackbar.success('Save successfully.');
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
  }

  get email(): FormControl {
    return this.orderForm.get('email') as FormControl;
  }
}
