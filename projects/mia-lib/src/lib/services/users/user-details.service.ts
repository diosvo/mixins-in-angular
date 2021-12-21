import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable, shareReplay, Subject, takeUntil, tap } from 'rxjs';
import { ActivatedParamsService } from '../activated-params/activated-params.service';
import { User, users_endpoint, user_id_endpoint } from './user-service.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService implements OnDestroy {
  private _user$ = new BehaviorSubject<User>(null);
  readonly currentUser$ = this._user$.asObservable();

  private _loading$ = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading$.asObservable();

  private _destroyed$ = new Subject<boolean>();

  constructor(
    private readonly http: HttpClient,
    private readonly route: ActivatedParamsService
  ) {
    this.getUserByRouteParams();
  }

  private getUserByRouteParams(): void {
    this.route.paramsMap$
      .pipe(takeUntil(this._destroyed$))
      .subscribe({
        next: ({ user_id }) => {
          if (!isNaN(+user_id)) {
            this._loading$.next(true);

            this.byId(+user_id)
              .pipe(finalize(() => this._loading$.next(false)))
              .subscribe({
                next: (response: User) => this._user$.next(response)
              });
          }
        }
      });
  }

  byId(id: number): Observable<User> {
    return this.http.get<Required<User>>(user_id_endpoint(id)).pipe(
      map(({ id, name, email }) => <User>{ id, name, email, hobbies: ['coding', 'basketball'] }),
      shareReplay()
    );
  }

  create(user: User): Observable<User> {
    return this.http.post<Required<User>>(users_endpoint, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<Required<User>>(user_id_endpoint(user.id), user).pipe(
      tap((data: User) => this._user$.next(data))
    );
  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
}
