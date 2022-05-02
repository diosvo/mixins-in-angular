import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';

@Injectable()
export abstract class AbstractFormService<T, InputT extends { id?: unknown }> {

  form: FormGroup;

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

  save$(): Observable<T> {
    if (this.form.invalid) {
      return throwError(() => new Error('Invalid form.'));
    }

    const id = this.form.get('id')?.value ?? null;
    return id ? this.update$(id) : this.create$();
  }

  protected abstract create$(): Observable<T>;

  protected abstract update$(id: string): Observable<T>;
}