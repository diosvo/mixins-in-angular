import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import isEmpty from 'lodash.isempty';
import isUndefined from 'lodash.isundefined';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable()
export abstract class AbstractFormService<T> {

  form: FormGroup;
  protected abstract primary_key: string;
  abstract isEdit$: BehaviorSubject<boolean>;

  constructor(protected fb: FormBuilder) {
    this.form = this.buildForm();
  }

  get valid(): boolean {
    if (this.form.untouched) return false;
    return this.form.valid;
  }

  getFormValue(): T {
    return this.form.value;
  }

  setFormValue(data: T): void {
    if (!data) {
      return this.form.reset();
    }
    return this.form.reset(data);
  }

  abstract buildForm(): FormGroup;

  abstract initializeValue$(): Observable<{}>;

  abstract loadFromApiAndFillForm$(id: string | number): Observable<T>;

  save$(): Observable<T> {
    if (isEmpty(this.primary_key) || isUndefined(this.primary_key)) {
      return throwError(() => new Error('Please provide a primary key.'));
    }
    if (!this.valid) {
      return throwError(() => new Error('Invalid form.'));
    }
    return this.isEdit$.value ? this.update$(this.primary_key) : this.create$();
  }

  protected abstract create$(): Observable<T>;

  protected abstract update$(id: string): Observable<T>;
}