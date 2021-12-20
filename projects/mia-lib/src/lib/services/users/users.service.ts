import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IUser } from '@lib/models/user';
import { BehaviorSubject, finalize, map, Observable, shareReplay, tap } from 'rxjs';
import { ActivatedParamsService } from '../activated-params/activated-params.service';
import { BaseService } from '../base/base.service';

export type User = Partial<IUser>;

@Injectable({
  providedIn: 'root'
})

export class UsersService implements BaseService<User> {

  private _user$ = new BehaviorSubject<User>(null);
  readonly currentUser$ = this._user$.asObservable();

  private _loading$ = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading$.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly route: ActivatedParamsService
  ) {
    this.getUserByRouteParams();
  }

  private getUserByRouteParams(): void {
    this.route.paramsMap$.subscribe({
      next: ({ user_id }) => {
        this._loading$.next(true);

        this.byId(+user_id)
          .pipe(finalize(() => this._loading$.next(false)))
          .subscribe({
            next: (response: User) => this._user$.next(response)
          });
      }
    });
  }

  all(): Observable<Array<User>> {
    return this.http.get<Array<Required<User>>>(this.endpoint).pipe(
      map(data => data.map(({ id, name, email }) => <User>{ id, name, email })),
      shareReplay()
    );
  }

  byId(id: number): Observable<User> {
    return this.http.get<Required<User>>(this.urlById(id)).pipe(
      map(({ id, name, email }) => <User>{ id, name, email, hobbies: ['coding', 'basketball'] }),
      shareReplay()
    );
  }

  create(user: User): Observable<User> {
    return this.http.post<Required<User>>(this.endpoint, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<Required<User>>(this.urlById(user.id), user).pipe(
      tap((data: User) => this._user$.next(data))
    );
  }

  delete(id: number): Observable<User> {
    return this.http.delete<Required<User>>(this.urlById(id));
  }

  private urlById(id: number | string): string {
    return this.endpoint + `${id}`;
  }

  private get endpoint(): string {
    return environment.jsonPlaceHolderUrl + 'users/';
  }
}
