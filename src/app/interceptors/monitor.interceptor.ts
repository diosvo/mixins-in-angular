import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoggerFactory } from '@lib/helpers/logger.factory';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class MonitorInterceptor implements HttpInterceptor {

  private loggerFactory = inject(LoggerFactory);
  private logger = this.loggerFactory.createLogger('MonitorInterceptor', 'auth');

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const begin = performance.now();

    return next.handle(request).pipe(
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
