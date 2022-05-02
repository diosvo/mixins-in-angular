import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import isEmpty from 'lodash.isempty';
import isUndefined from 'lodash.isundefined';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable()
export abstract class AbstractFormService<T, InputT extends { id?: unknown }> {

  form: FormGroup;
  abstract isEdit$: BehaviorSubject<boolean>;

  constructor(protected fb: FormBuilder) {
    this.form = this.buildForm();
  }

  get valid(): boolean {
    if (this.form.untouched) return false;
    return this.form.valid;
  }

  getFormValue(): InputT {
    return this.form.value;
  }

  setFormValue(data: InputT): void {
    if (!data) {
      this.form.reset();
    }

    this.form.patchValue(data);
    // when we have to use id, consider the form for UPDATE rather than CREATE
    if (data.id) {
      const control = new FormControl(data.id);
      this.form.addControl('id', control);
    }
  }

  abstract buildForm(): FormGroup;

  abstract initializeValue$(): Observable<{}>;

  abstract loadFromApiAndFillForm$(id: string | number): Observable<T>;

  save$(primary_key = 'id'): Observable<T> {
    if (this.form.invalid) {
      return throwError(() => new Error('Invalid form.'));
    }
    if (isEmpty(primary_key) || isUndefined(primary_key)) {
      return throwError(() => new Error('Please provide a primary key.'));
    }

    const id = this.form.get(primary_key)?.value ?? null;
    return id ? this.update$(id) : this.create$();
  }

  protected abstract create$(): Observable<T>;

  protected abstract update$(id: string): Observable<T>;
}