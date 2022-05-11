import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeactivateComponent } from '@lib/guards/unsaved-changes.guard';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { UserDetailsService } from '@lib/services/users/user-details.service';
import { hasDuplicates } from '@lib/utils/array-utils';
import { Regex } from '@lib/utils/form-validation';
import isEmpty from 'lodash.isempty';
import isEqual from 'lodash.isequal';
import { finalize, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'user-details',
  templateUrl: './details.component.html',
  styles: ['@use \'display/host\';']
})
export class DetailsComponent implements OnInit, OnDestroy, DeactivateComponent {

  saving = false;
  loading = true;
  hasChanged = false;

  readonly errorMessage$ = new Subject<string>();
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

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
        switchMap((params: Params) => {
          return isEmpty(params)
            ? this.service.initializeValue$()
            : this.service.loadFromApiAndFillForm$(params['id']);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: () => this.loading = false,
        error: ({ message }) => this.errorMessage$.next(message),
      });
    this.watchForFormChanges();
  }

  disableButton(): boolean {
    return !this.hasChanged || !this.service.valid || this.saving;
  }

  canDeactivate(): boolean {
    return this.disableButton();
  }

  saveChanges(): void {
    this.saving = true;

    this.service.save$()
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: () => this.snackbar.success(`The user has been ${this.service.isEdit$.value ? 'updated' : 'created'}.`),
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
    this.service.onFormChanges$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (changed: boolean) => this.hasChanged = changed
      });
  }

  get hobbies(): FormControl {
    return this.service.form.get('hobbies') as FormControl;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.service.setFormValue();
  }
}
