import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseAuth, IUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedIn$.asObservable();
  user!: IUser;

  private readonly TOKEN_NAME = 'dv_token';

  get token(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(
    private http: HttpClient
  ) {
    this.isLoggedIn$.next(!!this.token);
    this.user = !!this.token ? this.getUser(this.token) : {} as IUser;
  }

  login(info: BaseAuth): Observable<{}> {
    return this.http.post('login', { info })
      .pipe(
        tap({
          next: (response: IUser) => {
            this.isLoggedIn$.next(true);
            localStorage.setItem(this.TOKEN_NAME, response.token);
            this.user = this.getUser(response.token);
          }
        })
      );
  }

  private getUser(token: string): IUser {
    return JSON.parse(atob((token.split('.')[1]))) as IUser;
  }

  logout(): void {
    this.isLoggedIn$.next(false);
    localStorage.removeItem(this.TOKEN_NAME);
  }
}
