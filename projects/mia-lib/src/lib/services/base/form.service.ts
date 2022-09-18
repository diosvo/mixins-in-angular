import { FormBuilder, FormGroup } from '@angular/forms';
import isEqual from 'lodash.isequal';
import omit from 'lodash.omit';
import { BehaviorSubject, combineLatest, finalize, map, Observable, pipe, startWith, tap } from 'rxjs';

export abstract class AbstractFormService<T> {

  form: FormGroup;
  protected abstract primary_key: string;
  abstract isEdit$: BehaviorSubject<boolean>;
  abstract primitiveValue$: BehaviorSubject<T>;

  constructor(protected fb: FormBuilder) {
    this.form = this.buildForm();
  }

  get valid(): boolean {
    if (this.form.pristine) {
      return false;
    };
    return this.form.valid;
  }

  getFormValue(): T {
    return this.form.value;
  }

  setFormValue(data?: T): void {
    if (!data) {
      return this.form.reset();
    }
    return this.form.reset(data);
  }

  abstract buildForm(): FormGroup;

  abstract initializeValue$(): Observable<T>;

  abstract loadFromApiAndFillForm$(id: unknown): Observable<T>;

  onFormChanges$(exclusions = []): Observable<boolean> {
    return combineLatest([this.primitiveValue$, this.form.valueChanges])
      .pipe(
        map(([prev, next]) => !isEqual(omit(prev, exclusions), omit(next, exclusions))),
        startWith(false)
      );
  }

  save$(): Observable<T> {
    this.form.disable();
    return this.isEdit$.value
      ? this.update$(this.getFormValue()[this.primary_key]).pipe(this.pipeHandler())
      : this.create$().pipe(this.pipeHandler());
  }

  protected abstract create$(): Observable<T>;

  protected abstract update$(id: string | number): Observable<T>;

  protected pipeHandler = () =>
    pipe(
      tap((changes: T) => {
        this.setFormValue(changes);
        this.primitiveValue$.next(changes);
      }),
      finalize(() => this.form.enable())
    );
}