import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode, HTTP_INTERCEPTORS } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import isEqual from 'lodash.isequal';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private router = inject(Router);
  private service = inject(AuthService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.service.user.expire.toString();

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Key ${token}` }
      });
    }

    return next.handle(request).pipe(
      catchError((error: Error) => {
        this.router.navigateByUrl('/components-ui');

        if (error instanceof HttpErrorResponse) {
          if (isEqual(error.status), HttpStatusCode.Unauthorized) {
            this.service.updateUserState(null, false);
            return throwError(() => new Error('Your session has been expired.'));;
          }
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
