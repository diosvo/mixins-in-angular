import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, Subject, takeUntil, tap, throwError, zip } from 'rxjs';
import { ActivatedParamsService } from '../activated-params/activated-params.service';
import { BaseService } from '../base/base.service';
import { HandleService } from '../base/handle.service';
import { DestroyService } from '../destroy/destroy.service';
import { endpoint, id_endpoint, User } from './user-service.model';

@Injectable()
export class UserDetailsService extends BaseService<User> {
  private _user$ = new BehaviorSubject<User>(null);
  readonly currentUser$ = this._user$.asObservable();

  private _loading$ = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading$.asObservable();

  readonly errorMessage$ = new Subject<string>();

  constructor(
    protected readonly http: HttpClient,
    protected readonly handle: HandleService,
    private readonly destroy$: DestroyService,
    private readonly route: ActivatedParamsService
  ) {
    super(http, handle);
    this.getUserByRouteParams();
  }

  private getUserByRouteParams(): void {
    zip([this.route.pathMap$, this.route.paramsMap$]).subscribe({
      next: ([path, params]) => {
        const user_id = +params.user_id;

        if (!isNaN(user_id) && !path.includes('create')) {
          this._loading$.next(true);

          this.byId(user_id)
            .pipe(
              finalize(() => this._loading$.next(false)),
              catchError(({ message }) => {
                this.errorMessage$.next(message);
                return throwError(() => new Error(message));
              }),
              takeUntil(this.destroy$)
            )
            .subscribe({
              next: (response: User) => this._user$.next(response)
            });
        }
      }
    });
  }

  private byId(id: number): Observable<User> {
    return this.get(id_endpoint(id)).pipe(
      map(({ id, name, email }) => <User>{ id, name, email, hobbies: ['coding', 'basketball'] }),
    );
  }

  create(user: User): Observable<User> {
    return this.add(endpoint, { body: user });
  }

  update(user: User): Observable<User> {
    return this.edit(id_endpoint(user.id), { body: user }).pipe(
      tap((data: User) => this._user$.next(data))
    );
  }

  remove(user: User): Observable<User> {
    return this.delete(id_endpoint(user.id));
  }
}
