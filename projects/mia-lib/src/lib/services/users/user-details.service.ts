import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInput } from '@lib/models/user';
import { BehaviorSubject, map, Observable, of, shareReplay } from 'rxjs';
import { BaseService } from '../base/base.service';
import { AbstractFormService } from '../base/form.service';
import { HandleService } from '../base/handle.service';
import { endpoint, id_endpoint } from './user-service.model';

const DEFAULT_VALUE = {
  id: null,
  name: '',
  email: '',
  hobbies: []
};

@Injectable()
export class InternalService extends BaseService<UserInput> {

  constructor(
    protected readonly http: HttpClient,
    protected readonly handle: HandleService,
  ) {
    super(http, handle);
  }

  byId(id: number): Observable<UserInput> {
    return this.get(id_endpoint(id)).pipe(
      map(({ id, name, email }) => ({ id, name, email, hobbies: ['coding', 'basketball'] })),
      shareReplay(1)
    );
  }

  create(user: UserInput): Observable<UserInput> {
    return this.add(endpoint, { body: user });
  }

  update(user: UserInput): Observable<UserInput> {
    return this.edit(id_endpoint(user.id), { body: user });
  }

  remove(id: number): Observable<unknown> {
    return this.delete(id_endpoint(id));
  }
}

@Injectable()
export class UserDetailsService extends AbstractFormService<UserInput>{

  primary_key = 'id';
  isEdit$ = new BehaviorSubject<boolean>(false);
  primitiveValue$ = new BehaviorSubject<UserInput>(DEFAULT_VALUE);

  constructor(
    protected override fb: FormBuilder,
    private readonly internal: InternalService,
  ) {
    super(fb);
  }

  buildForm(): FormGroup {
    return this.fb.group({
      id: [DEFAULT_VALUE.id],
      name: [DEFAULT_VALUE.name, Validators.required],
      email: [DEFAULT_VALUE.email, [Validators.required, Validators.email]],
      hobbies: [DEFAULT_VALUE.hobbies]
    });
  }

  loadFromApiAndFillForm$(id: number): Observable<UserInput> {
    this.isEdit$.next(true);
    return this.internal.byId(id).pipe(this.pipeHandler());
  }

  initializeValue$(): Observable<UserInput> {
    this.isEdit$.next(false);
    return of(DEFAULT_VALUE).pipe(this.pipeHandler());
  }

  protected create$(): Observable<UserInput> {
    delete this.getFormValue()[this.primary_key];
    return this.internal.create(this.getFormValue());
  }

  protected update$(): Observable<UserInput> {
    return this.internal.update(this.getFormValue());
  }

  remove$(id: number): Observable<unknown> {
    return this.internal.remove(id);
  }
}