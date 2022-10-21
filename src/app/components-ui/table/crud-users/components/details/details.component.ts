import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomButtonComponent } from '@lib/components/custom-button/custom-button.component';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { UserDetailsService } from '@lib/services/json-placeholder/users/user-details.service';
import { User } from '@lib/services/json-placeholder/users/user-service.model';
import { hasDuplicates } from '@lib/utils/array-utils';
import { Regex } from '@lib/utils/form-validation';
import isEqual from 'lodash.isequal';
import { iif, Observable } from 'rxjs';

@Component({
  selector: 'user-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    CustomInputComponent,
    CustomButtonComponent,

    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {

  user$: Observable<User>;

  readonly form = this.service.form;
  readonly hasChanged$ = this.service.onFormChanges$(['id', 'phone', 'address', 'company', 'username', 'website']);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly state: {
      user: User,
      isEdit: boolean;
    },
    private readonly service: UserDetailsService,
    private readonly dialogRef: MatDialogRef<DetailsComponent>
  ) { }

  ngOnInit(): void {
    this.user$ = iif(
      () => this.state.isEdit,
      this.service.loadFromApiAndFillForm$(this.state.user),
      this.service.initializeValue$()
    );
  }

  onSave(ok: boolean): void {
    this.dialogRef.close(ok);
  }

  addHobby(event: MatChipInputEvent): void {
    const { value, chipInput } = event;
    const currentValue = (value || '').trim();

    if (currentValue) {
      this.hobbies.setValue([...this.hobbies.value, currentValue]);
    };
    chipInput.clear();
    this.hobbyValidator(currentValue);
  }

  removeHobby(index: number): void {
    this.hobbies.setValue(this.hobbies.value.filter((_item, idx) => !isEqual(index, idx)));
    this.hobbies.value.forEach((item: string) => this.hobbyValidator(item));
  }

  private hobbyValidator(hobby: string): void {
    const regex = new RegExp(Regex.Text);

    if (hasDuplicates(this.hobbies.value)) {
      this.hobbies.setErrors({ duplicate: true });
    } else if (!regex.test(hobby)) {
      this.hobbies.setErrors({ invalid: true });
    }
  }

  get hobbies(): FormControl {
    return this.service.form.get('hobbies') as FormControl;
  }
}
