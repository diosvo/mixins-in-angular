import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import isUndefined from 'lodash.isundefined';
import { catchError, shareReplay, take } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { HandleService } from './handle.service';

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
    protected readonly handle: HandleService,
  ) { }

  protected list(url: string): Observable<T[]> {
    return this.fetch(EMethod.GET)(url)({}) as Observable<T[]>;
  }

  protected get(url: string): Observable<T> {
    return this.fetch(EMethod.GET)(url)({}) as Observable<T>;
  }

  protected add(url: string, { body }): Observable<T> {
    return this.fetch(EMethod.POST)(url)({ body }) as Observable<T>;
  }

  protected edit(url: string, { body }): Observable<T> {
    return this.fetch(EMethod.PUT)(url)({ body }) as Observable<T>;
  }

  protected modify(url: string, { body }): Observable<T> {
    return this.fetch(EMethod.PATCH)(url)({ body }) as Observable<T>;
  }

  protected delete(url: string): Observable<unknown> {
    return this.fetch(EMethod.DELETE)(url)({});
  }

  private fetch = (method: Method) => (endpoint: string) =>
    (extended: Partial<{ params: string, body: unknown }>): Observable<unknown> => {
      const url = isUndefined(extended.params) ? endpoint : `${endpoint}?${extended.params}`;
      const body = extended.body ?? {} as any;

      return this.httpClient[method](url, body).pipe(
        take(1),
        shareReplay(1),
        catchError(this.handle.errorHandler(this.constructor.name))
      );
    };
}
