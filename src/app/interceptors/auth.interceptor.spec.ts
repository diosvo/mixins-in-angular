import { HttpRequest, HttpStatusCode } from '@angular/common/http';
import { EUrl } from '@home/models/url.enum';
import { Observable, of } from 'rxjs';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  const user = {
    expire: 1665296716
  };

  const mockRouter: any = {
    navigateByUrl: jest.fn()
  };

  const mockAuthService: any = {
    user,
    updateUserState: jest.fn()
  };

  const mockErrorHandlerService: any = {
    handleError: jest.fn().mockReturnValue(of({}))
  };

  const token = user.expire.toString();

  beforeEach(() => {
    interceptor = new AuthInterceptor(mockRouter, mockAuthService, mockErrorHandlerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize interceptor', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('intercept()', () => {
    test('should set header if the user is logged in', (done) => {
      const mockRequest: any = {
        clone: jest.fn()
      };
      const mockHandler: any = {
        handle: () =>
          new Observable((subscriber) => {
            subscriber.next(token);
          })
      };

      interceptor.intercept(mockRequest, mockHandler).subscribe({
        next: () => {
          expect(mockRequest.clone).toBeCalledWith({
            setHeaders: { Authorization: `Key ${token}` }
          });
          done();
        },
      });
    });

    test('should throw error if the toke has been expired', (done) => {
      mockAuthService.user = null;
      const mockError = {
        status: HttpStatusCode.BadRequest,
        message: 'Bad Request'
      };

      const mockRequest = new HttpRequest('GET', '/test');
      const mockHandler: any = {
        handle: () =>
          new Observable((subscriber) => {
            subscriber.error(mockError);
            subscriber.complete();
          })
      };

      interceptor.intercept(mockRequest, mockHandler).subscribe({
        error: (err) => {
          expect(mockRouter.navigateByUrl).toBeCalledWith(`/${EUrl.COMPONENT}`);
          expect(mockAuthService.updateUserState).toBeCalledWith(null, false);
          expect(err).toEqual(mockError);
          done();
        }
      });
    });
  });
});