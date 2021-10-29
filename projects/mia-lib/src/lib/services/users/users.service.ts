import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from '@env/environment';
import { IUser } from '@lib/models/user';
import { BehaviorSubject, filter, map, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { BaseService } from '../base/base.service';

type User = Partial<IUser>;

@Injectable({
  providedIn: 'root'
})

export class UsersService implements BaseService<User> {

  private _user$ = new BehaviorSubject<User>(null);
  readonly currentUser$ = this._user$.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  private getUserByRouteParams(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(_ => this.activatedRoute),
        map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        switchMap(({ params }) => params)
      )
      .subscribe({
        next: (params: { user_id: number }) => {
          if (!isNaN(params.user_id)) {
            this.byId(params.user_id).subscribe({
              next: (response: User) => this._user$.next(response)
            })
          } else {
            this._user$.next({ name: '', email: '' });
          }
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
      shareReplay({ bufferSize: 1, refCount: false })
    );
  }

  create(user: User): Observable<User> {
    return this.http.post<Required<User>>(this.url, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<Required<User>>(this.urlById(user.id), user).pipe(
      tap((response: User) => this._user$.next(response))
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
