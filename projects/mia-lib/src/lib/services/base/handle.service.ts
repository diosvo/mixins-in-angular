import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { pipe } from 'gsap/all';
import { interval, mergeMap, retryWhen, take, throwError, TimeoutError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HandleService {
  isServerError = (error: HttpErrorResponse) => error.status >= 500;

  retryServerErrors = <T>() => {
    let tryCount = 2;

    return pipe(
      retryWhen<T>(errors =>
        errors.pipe(mergeMap(error => {
          if (this.isServerError(error) && tryCount > 0) {
            tryCount--;
            return interval(3000).pipe(take(1));
          }
          return throwError(() => new Error(error.message));
        }))
      )
    );
  }

  errorHandler = (name: string) => (error: HttpErrorResponse | TimeoutError) => {
    if (error instanceof TimeoutError) {
      return throwError(() => new Error(isDevMode() ? `Request timeout. (${name})` : 'Request Timeout'));
    }
    if (error instanceof HttpErrorResponse) {
      return throwError(() => new Error(isDevMode() ? `${error.message} (${name})` : `${error.message}`));
    }
  }
}
