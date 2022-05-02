import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserInput } from '@lib/models/user';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { UserDetailsService } from '@lib/services/users/user-details.service';
import { hasDuplicates } from '@lib/utils/array-utils';
import { Regex } from '@lib/utils/form-validation';
import isEqual from 'lodash.isequal';
import { BehaviorSubject, combineLatest, finalize, map, startWith, Subject, switchMap, take, takeUntil, throwError } from 'rxjs';

@Component({
  selector: 'user-details',
  templateUrl: './details.component.html',
  styles: ['@use \'display/host\';']
})
export class DetailsComponent implements OnInit {

  saving = false;
  loading = true;
  hasChanged = false;

  readonly errorMessage$ = new Subject<string>();
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  private primitiveValue$ = new BehaviorSubject<UserInput>({} as UserInput);

  constructor(
    private readonly router: Router,
    readonly service: UserDetailsService,
    private readonly route: ActivatedRoute,
    private readonly destroy$: DestroyService,
    private readonly snackbar: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) =>
          params['id']
            ? this.service.loadFromApiAndFillForm$(params['id'])
            : this.service.initializeValue$()
        ),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (user: UserInput) => {
          this.loading = false;
          this.primitiveValue$.next(user);
        },
        error: ({ message }) => {
          this.errorMessage$.next(message);
          return throwError(() => new Error(message));
        }
      });
    this.watchForFormChanges();
  }

  disableButton(): boolean {
    return !this.service.valid || this.saving;
  }

  saveChanges(): void {
    this.saving = true;

    this.service.save$()
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: () => this.snackbar.success(`The user has been ${this.service.form.get('id') ? 'update' : 'create'}.`),
        error: ({ message }) => this.snackbar.error(message),
        complete: () => this.router.navigate(['components/table/crud-users'])
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

  private watchForFormChanges(): void {
    combineLatest([this.primitiveValue$.asObservable().pipe(take(1)), this.service.form.valueChanges])
      .pipe(
        map(([prev, next]) => !isEqual(prev, next)),
        startWith(false),
        takeUntil(this.destroy$)
      )
      .subscribe((changed: boolean) => this.hasChanged = changed);
  }

  get hobbies(): FormControl {
    return this.service.form.get('hobbies') as FormControl;
  }
}
