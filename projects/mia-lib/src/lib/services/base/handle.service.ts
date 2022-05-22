import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { throwError, TimeoutError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HandleService {
  isServerError = (error: HttpErrorResponse): boolean => error.status >= HttpStatusCode.InternalServerError;

  errorHandler = (name: string) => (error: HttpErrorResponse | TimeoutError) => {
    if (error instanceof TimeoutError) {
      return throwError(() => new Error(isDevMode() ? `Request timeout. (${name})` : 'Request Timeout'));
    }
    if (error instanceof HttpErrorResponse) {
      return throwError(() => new Error(isDevMode() ? `${error.message} (${name})` : `${error.message}`));
    }
  };
}
