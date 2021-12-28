import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';
import { AuthInterceptor, AuthInterceptorProvider } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let interceptor: AuthInterceptor;
  let http_testing: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        AuthInterceptor,
        AuthInterceptorProvider,
      ]
    });

    http = TestBed.inject(HttpClient);
    interceptor = TestBed.inject(AuthInterceptor);
    http_testing = TestBed.inject(HttpTestingController);
  });

  test('should add an authorization header', () => {
    let response: HttpResponse<unknown>;
    const request = new HttpRequest('GET', '/test');
    const next = {
      handle: () => {
        return new Observable(subscriber => {
          subscriber.next('token_string');
          subscriber.complete();
        });
      }
    } as any;

    interceptor.intercept(request, next).subscribe(() => {
      expect(response.headers.has('authorization')).toBe(true);
      expect(response.headers.get('authorization')).toEqual('token_string');
    });
  });
});