import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerFactory } from '@lib/helpers/logger.factory';
import { concatMap, delay, finalize, Observable, of, retryWhen, throwError } from 'rxjs';

const retry = {
  count: 3,
  waitMs: 1000
};

@Injectable()
export class MonitorInterceptor implements HttpInterceptor {
  private logger = this.loggerFactory.createLogger('MonitorInterceptor', 'auth');

  constructor(private loggerFactory: LoggerFactory) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const begin = performance.now();

    return next.handle(request).pipe(
      retryWhen((error: Observable<HttpErrorResponse>) =>
        error.pipe(
          concatMap((({ status, message }, count) => {
            if (count < retry.count && status === HttpStatusCode.ServiceUnavailable) {
              return of({ status, message });
            }

            return throwError(() => new Error(message));
          })),
          delay(retry.waitMs)
        )
      ),
      finalize(() => this.logRequestTime(begin, request.url, request.method))
    );
  }

  /**
   * @description logs the request duration, URL and method of every outgoing HTTP request
   */

  private logRequestTime(startTime: number, url: string, method: string): void {
    const requestDuration = `${performance.now() - startTime}`;
    this.logger.log(`${method} ${url} - ${requestDuration} ms`);
  }
}
