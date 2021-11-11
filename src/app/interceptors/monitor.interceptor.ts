import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '@lib/services/log/logger.service';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class MonitorInterceptor implements HttpInterceptor {

  constructor(private logger: LoggerService) { }

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
    this.logger.log(`HTTP.${method} ${url} - ${requestDuration} ms`);
  }
}
