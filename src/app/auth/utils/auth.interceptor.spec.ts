import { HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';
import { AuthInterceptor, AuthInterceptorProvider } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        AuthInterceptor,
        AuthInterceptorProvider,
      ]
    });

    interceptor = TestBed.inject(AuthInterceptor);
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