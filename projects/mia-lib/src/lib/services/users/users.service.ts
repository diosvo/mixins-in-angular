import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from '@env/environment';
import { IUser } from '@lib/models/user';
import { BehaviorSubject, filter, finalize, map, Observable, pluck, shareReplay, switchMap, tap } from 'rxjs';
import { BaseService } from '../base/base.service';

type User = Partial<IUser>;

@Injectable({
  providedIn: 'root'
})

export class UsersService implements BaseService<User> {
  private _user$ = new BehaviorSubject<User>(null);
  readonly currentUser$ = this._user$.asObservable();

  private _loading$ = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading$.asObservable();

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.getUserByRouteParams();
  }

  private getUserByRouteParams(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map((): ActivatedRoute => this.activatedRoute),
        map((): ActivatedRoute => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route: ActivatedRoute) => route.outlet === 'primary'),
        switchMap(({ params }) => params),
        pluck('user_id')
      )
      .subscribe(user_id => {
        if (user_id !== undefined) {
          this._loading$.next(true);

          this.byId(user_id)
            .pipe(finalize(() => this._loading$.next(false)))
            .subscribe(response => this._user$.next(response));
        } else {
          this._user$.next(null);
        }
      });
  }

  all(): Observable<Array<User>> {
    return this.http.get<Array<Required<User>>>(this.url).pipe(
      map(data => data.map(({ id, name, email }) => <User>{ id, name, email })),
      shareReplay()
    );
  }

  byId(id: number): Observable<User> {
    return this.http.get<Required<User>>(this.urlById(id)).pipe(
      map(({ id, name, email }) => <User>{ id, name, email }),
      shareReplay()
    );
  }

  create(user: User): Observable<User> {
    return this.http.post<Required<User>>(this.url, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<Required<User>>(this.urlById(user.id), user).pipe(
      tap(new_user => this._user$.next(new_user))
    );
  }

  delete(id: number): Observable<User> {
    return this.http.delete<Required<User>>(this.urlById(id));
  }

  private get url(): string {
    return environment.jsonPlaceHolderUrl + 'users';
  }

  private urlById(id: number | string): string {
    return this.url + `/${id}`;
  }
}
