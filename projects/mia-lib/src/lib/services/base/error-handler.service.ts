import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError, TimeoutError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  handleError = (name: string) =>
    (error: TimeoutError | ErrorEvent | HttpErrorResponse): Observable<never> => {
      const throwMessage = this.env(name);

      if (error instanceof TimeoutError) {
        return throwMessage('Request Timeout');
      }
      if (error.error instanceof ErrorEvent) {
        return throwMessage(`${error.error.message}`);
      }
      if (error instanceof HttpErrorResponse) {
        let message = error.message;

        switch (error.status) {
          case HttpStatusCode.Unauthorized: {
            message = 'Unauthorized: Access is denied due to invalid credentials.';
            break;
          }
          case HttpStatusCode.Forbidden: {
            message = 'Forbidden: You don\'t have permission to access this resource.';
            break;
          }
          case HttpStatusCode.NotFound: {
            message = 'The request URL/ settings/ storage was not found on this server.';
            break;
          }
        }
        return throwMessage(message);
      }
    };

  private env = (name: string) => (message: string) => {
    const error_message = `${message}.`;
    return throwError(() => new Error(
      environment.production
        ? error_message
        : error_message.concat(` (${name})`)
    ));
  };
}
