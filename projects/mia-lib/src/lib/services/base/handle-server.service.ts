import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'gsap/all';
import { interval, mergeMap, retryWhen, take, throwError } from 'rxjs';

@Injectable()

export class HandleServerService {
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
}
