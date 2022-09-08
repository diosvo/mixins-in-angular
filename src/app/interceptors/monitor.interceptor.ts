import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoggerFactory } from '@lib/helpers/logger.factory';
import { LoadingService } from '@lib/services/loading/loading.service';
import isEqual from 'lodash.isequal';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class MonitorInterceptor implements HttpInterceptor {

  private loggerFactory = inject(LoggerFactory);
  private logger = this.loggerFactory.createLogger('MonitorInterceptor', 'auth');

  private loader = inject(LoadingService);
  private total = 0;
  private completed = 0;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.loader.show();
    this.total++;

    const begin = performance.now();

    return next.handle(request).pipe(
      finalize(() => {
        this.completed++;

        if (isEqual(this.completed, this.total)) {
          this.loader.hide();
          this.total = 0;
          this.completed = 0;
        }

        this.logRequestTime(begin, request.url, request.method);
      })
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
