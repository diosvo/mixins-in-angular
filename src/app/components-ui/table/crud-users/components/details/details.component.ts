import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { User } from '@lib/services/users/user-service.model';
import { hasDuplicates } from '@lib/utils/array-utils';
import { Regex } from '@lib/utils/form-validation';
import isEqual from 'lodash.isequal';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'user-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    hobbies: [[]]
  });

  @Input() user: User;
  @Output() isValid = new EventEmitter<boolean>();
  @Output() changed = new EventEmitter<User>();

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form.patchValue(this.user);
    this.watchForFormChanged();
  }

  private watchForFormChanged(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
      )
      .subscribe((details: User) => {
        this.changed.emit(details);
        this.isValid.emit(this.form.valid);
      });
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
    return this.form.get('hobbies') as FormControl;
  }
}
