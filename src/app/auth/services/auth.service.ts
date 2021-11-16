import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUser, BaseAuth } from '@auth/models/auth.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedIn$.asObservable();
  user!: AuthUser;

  private readonly TOKEN_NAME = 'dv_token';

  get token(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(
    private http: HttpClient
  ) {
    this.isLoggedIn$.next(!!this.token);
    this.user = !!this.token ? this.getUser(this.token) : {} as AuthUser;
  }

  login(info: BaseAuth): Observable<{}> {
    return this.http.post('login', { info })
      .pipe(
        tap({
          next: (response: AuthUser) => {
            this.isLoggedIn$.next(true);
            localStorage.setItem(this.TOKEN_NAME, response.token);
            this.user = this.getUser(response.token);
          }
        })
      );
  }

  private getUser(token: string): AuthUser {
    return JSON.parse(Buffer.from((token.split('.')[1])).toString('base64')) as AuthUser;
  }

  logout(): void {
    this.isLoggedIn$.next(false);
    localStorage.clear();
  }
}
