import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserInput } from '@lib/models/json-placeholder/user.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BaseService } from '../../base/base.service';
import { ErrorHandlerService } from '../../base/error-handler.service';
import { AbstractFormService } from '../../base/form.service';
import { endpoint, id_endpoint } from './user-service.model';

const DEFAULT_VALUES: UserInput = {
  id: null,
  name: '',
  email: '',
  hobbies: [],
};

@Injectable({
  providedIn: 'root'
})
export class InternalUserService extends BaseService<UserInput> {

  constructor(
    protected readonly http: HttpClient,
    protected readonly handle: ErrorHandlerService,
  ) {
    super(http, handle);
  }

  all(): Observable<User[]> {
    return this.list(endpoint) as Observable<User[]>;
  }

  create(user: UserInput): Observable<UserInput> {
    return this.add(endpoint, user);
  }

  update(user: UserInput): Observable<UserInput> {
    return this.edit(id_endpoint(user.id), user);
  }

  remove(id: number): Observable<unknown> {
    return this.delete(id_endpoint(id));
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService extends AbstractFormService<UserInput>{

  primary_key = 'id';
  isEdit$ = new BehaviorSubject<boolean>(false);
  primitiveValue$ = new BehaviorSubject<UserInput>(DEFAULT_VALUES);

  constructor(
    protected override fb: FormBuilder,
    private readonly internal: InternalUserService,
  ) {
    super(fb);
  }

  all$(): Observable<User[]> {
    return this.internal.all();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      id: [DEFAULT_VALUES.id],
      name: [DEFAULT_VALUES.name, Validators.required],
      email: [DEFAULT_VALUES.email, [Validators.required, Validators.email]],
      hobbies: [DEFAULT_VALUES.hobbies, { nonNullable: true }]
    });
  }

  loadFromApiAndFillForm$(user: User): Observable<UserInput> {
    return of(user).pipe(this.pipeHandler());
  }

  initializeValue$(): Observable<UserInput> {
    return of(DEFAULT_VALUES).pipe(this.pipeHandler());
  }

  create$(): Observable<UserInput> {
    delete this.getFormValue()[this.primary_key];
    return this.internal.create(this.getFormValue());
  }

  update$(): Observable<UserInput> {
    return this.internal.update(this.getFormValue());
  }

  remove$(id: number): Observable<unknown> {
    return this.internal.remove(id);
  }
}