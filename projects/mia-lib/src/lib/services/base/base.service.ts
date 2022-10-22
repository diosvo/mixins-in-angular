import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import isEmpty from 'lodash.isempty';
import isUndefined from 'lodash.isundefined';
import { catchError, shareReplay, take } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ErrorHandlerService } from './error-handler.service';

export enum EMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export type Method = Lowercase<`${EMethod}`>;

@Injectable()
export abstract class BaseService<T> {

  protected constructor(
    protected readonly httpClient: HttpClient,
    protected readonly handle: ErrorHandlerService,
  ) { }

  protected list(url: string, params = {}): Observable<T[]> {
    return this.fetch(EMethod.GET)(url)({ params }) as Observable<T[]>;
  }

  protected get(url: string): Observable<T> {
    return this.fetch(EMethod.GET)(url)({}) as Observable<T>;
  }

  protected add(url: string, body: T): Observable<T> {
    return this.fetch(EMethod.POST)(url)({ body }) as Observable<T>;
  }

  protected edit(url: string, body: T): Observable<T> {
    return this.fetch(EMethod.PUT)(url)({ body }) as Observable<T>;
  }

  protected modify(url: string, body: T): Observable<T> {
    return this.fetch(EMethod.PATCH)(url)({ body }) as Observable<T>;
  }

  protected delete(url: string): Observable<unknown> {
    return this.fetch(EMethod.DELETE)(url)({});
  }

  /** 
   * @param params a collection of matrix and query URL parameters.
   */
  private fetch = (method: Method) => (endpoint: string) =>
    (extended: Partial<{ params: Params, body: unknown }>): Observable<unknown> => {
      const url = isUndefined(extended.params) || isEmpty(extended.params)
        ? endpoint
        : `${endpoint}?${this.serializeParams(extended.params)}`;
      const body = extended.body ?? {} as any;

      return this.httpClient[method](url, body).pipe(
        take(1),
        shareReplay(1),
        catchError(this.handle.handleError(this.constructor.name))
      );
    };

  private serializeParams(params: Params): string {
    return Object.entries(params)
      .filter(([key, value]) => !isUndefined(value) || !isEmpty(value))
      .map(([key, value]) => `${key}=${value}`).join('&');
  }
}
