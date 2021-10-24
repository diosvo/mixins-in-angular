import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IUser } from '@lib/models/user';
import { catchError, map, Observable, shareReplay, Subject, throwError } from 'rxjs';
import { BaseService } from '../base/base.service';

type User = Partial<IUser>;

@Injectable({
  providedIn: 'root'
})

export class UsersService implements BaseService<User> {
  readonly hasError$ = new Subject<boolean>();

  constructor(
    private readonly http: HttpClient,
  ) { }

  all(): Observable<Array<User>> {
    return this.http.get<Array<Required<User>>>(this.url).pipe(
      map(data => data.map(({ name, email }) => <User>{ name, email })),
      shareReplay(),
      catchError(({ ok, message }) => {
        this.hasError$.next(!ok);
        return throwError(() => new Error(message));
      })
    );
  }

  byId(id: number): Observable<User> {
    return this.http.get<Required<User>>(this.urlById(id)).pipe(
      map(({ name, email }) => <User>{ name, email }),
      shareReplay({ bufferSize: 1, refCount: false })
    );
  }

  create(user: User): Observable<User> {
    return this.http.post<Required<User>>(this.url, user);
  }

  update(id: number, user: Required<User>): Observable<User> {
    return this.http.put<Required<User>>(this.urlById(id), user);
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
