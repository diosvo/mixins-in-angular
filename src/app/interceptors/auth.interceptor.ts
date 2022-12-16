import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { EUrl } from '@home/models/url.enum';
import { ErrorHandlerService } from '@lib/services/base/error-handler.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router,
    private readonly service: AuthService,
    private readonly handle: ErrorHandlerService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.service.user) {
      const token = this.service.user.expire.toString();

      request = request.clone({
        setHeaders: { Authorization: `Key ${token}` } // expire time will be token temporarily
      });
    }

    return next.handle(request).pipe(
      tap({
        error: () => {
          this.service.updateUserState(null, false);
          this.router.navigateByUrl(`/${EUrl.COMPONENT}`);
        }
      }),
      // catchError(this.handle.handleError(this.constructor.name)) // ERROR: selector is not a function
    );
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
