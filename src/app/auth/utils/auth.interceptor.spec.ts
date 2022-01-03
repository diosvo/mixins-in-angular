import { HttpRequest, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';
import { AuthInterceptor, AuthInterceptorProvider } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        AuthInterceptorProvider,
      ]
    });

    interceptor = TestBed.inject(AuthInterceptor);
    service = TestBed.inject(AuthService);
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

  describe('should handle error if an error related to', () => {
    test('unauthorized', () => {
      const request = new HttpRequest('GET', '/test');
      const next = {
        handle: () => {
          return new Observable(subscriber => {
            subscriber.error({ status: HttpStatusCode.Unauthorized });
            subscriber.complete();
          });
        }
      } as any;

      interceptor.intercept(request, next).subscribe(() => {
        expect(service.logout).toBeCalled();
      });
    });

    test('another issues', () => {
      const request = new HttpRequest('GET', '/test');
      const next = {
        handle: () => {
          return new Observable(subscriber => {
            subscriber.error({
              status: HttpStatusCode.BadRequest,
              message: 'Bad request'
            });
            subscriber.complete();
          });
        }
      } as any;

      interceptor.intercept(request, next).subscribe(message => expect(message).toBe('Bad request'));
    });
  });
});