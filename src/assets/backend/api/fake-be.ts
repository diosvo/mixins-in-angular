import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export const FAKE_JWT_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjY0MTYyMDYsImV4cCI6MTY1Nzk1MjIwNiwiZmlyc3ROYW1lIjoiRGlvcyIsInVzZXJuYW1lIjoiZGlvc3ZvIiwicm9sZXMiOlsiQWRtaW4iLCJHdWVzdCJdfQ.Z29vZGx1Y2s';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const { url, method, headers } = request;

    if (url.endsWith('login') && method === 'POST') {
      return handleLogin();
    }
    return next.handle(request);

    function isLoggedIn() {
      return headers.get('authorization') === FAKE_JWT_TOKEN;
    }

    function handleLogin(): Observable<HttpEvent<unknown>> {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            id: '1',
            username: 'diosvo',
            token: FAKE_JWT_TOKEN,
          },
        })
      );
    }
  }
}

export const FakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
