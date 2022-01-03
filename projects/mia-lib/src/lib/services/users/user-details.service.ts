import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, shareReplay, Subject, takeUntil, tap, throwError, zip } from 'rxjs';
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

  readonly errorMessage$ = new Subject<string>();
  private _destroyed$ = new Subject<boolean>();

  constructor(
    private readonly http: HttpClient,
    private readonly route: ActivatedParamsService
  ) {
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
              takeUntil(this._destroyed$)
            )
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
