import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { NgChanges } from '@lib/helpers/mark-function-properties';
import { IUser } from '@lib/models/user';
import { Regex } from '@lib/utils/form-validation';
import { hasDuplicates } from '@lib/utils/utils';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

type User = Partial<IUser>;

@Component({
  selector: 'user-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit, OnChanges, OnDestroy {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    hobbies: [[]]
  });
  private destroy$ = new Subject<void>();

  @Input() user: User;
  @Output() isValid = new EventEmitter<boolean>();
  @Output() changed = new EventEmitter<User>();

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  ngOnChanges(changes: NgChanges<DetailsComponent>): void {
    this.form.patchValue(changes.user.currentValue);
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
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
    this.hobbies.setValue(this.hobbies.value.filter((_item, idx) => index !== idx));
    this.hobbies.value.forEach((item: string) => this.hobbyValidator(item));
  }

  hobbyValidator(hobby: string): void {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
