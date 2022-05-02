import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser, UserInput } from '@lib/models/user';
import { map, Observable, of, shareReplay, tap } from 'rxjs';
import { BaseService } from '../base/base.service';
import { AbstractFormService } from '../base/form.service';
import { HandleService } from '../base/handle.service';
import { endpoint, id_endpoint, User } from './user-service.model';

const DEFAULT_VALUE = {
  name: '',
  email: '',
  hobbies: []
};

@Injectable()
export class InternalService extends BaseService<User> {

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

  create(user: User): Observable<User> {
    return this.add(endpoint, { body: user });
  }

  update(user: User): Observable<User> {
    return this.edit(id_endpoint(user.id), { body: user });
  }

  remove(id: number): Observable<User> {
    return this.delete(id_endpoint(id));
  }
}

@Injectable()
export class UserDetailsService extends AbstractFormService<User, UserInput>{

  constructor(
    protected override fb: FormBuilder,
    private readonly internal: InternalService,
  ) {
    super(fb);
  }

  buildForm(): FormGroup {
    return this.fb.group({
      name: [DEFAULT_VALUE.name, Validators.required],
      email: [DEFAULT_VALUE.email, [Validators.required, Validators.email]],
      hobbies: [DEFAULT_VALUE.hobbies]
    });
  }

  loadFromApiAndFillForm$(id: number): Observable<UserInput> {
    return this.internal.byId(id).pipe(
      tap((user: UserInput) => this.setFormValue(user))
    );
  }

  initializeValue$(): Observable<{}> {
    return of({}).pipe(
      tap(() => this.form.reset(DEFAULT_VALUE))
    );
  }

  protected create$(): Observable<Partial<IUser>> {
    return this.internal.create(this.getFormValue()).pipe(
      tap(() => this.form.reset())
    );
  }

  protected update$(): Observable<Partial<IUser>> {
    return this.internal.update(this.getFormValue()).pipe(
      tap((user: UserInput) => this.setFormValue(user))
    );
  }

  remove$(id: number): Observable<unknown> {
    return this.internal.remove(id);
  }
}