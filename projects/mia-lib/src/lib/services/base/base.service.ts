import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import isEqual from 'lodash.isequal';
import isUndefined from 'lodash.isundefined';
import { BehaviorSubject, catchError, shareReplay, switchMap, take, tap } from 'rxjs';
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

  private vm$: BehaviorSubject<T[]> = new BehaviorSubject(null);

  protected constructor(
    protected readonly httpClient: HttpClient,
    protected readonly handle: HandleService,
    protected cache = true,
  ) { }

  list(url: string): Observable<T[]> {
    if (this.vm$.value && this.cache) {
      return this.vm$.asObservable();
    }

    return this.fetch(EMethod.GET)(url)({}).pipe(
      switchMap((data: T[]) => {
        this.vm$.next(data);
        return this.vm$;
      })
    );
  }

  get(url: string): Observable<T> {
    return this.fetch(EMethod.GET)(url)({}) as Observable<T>;
  }

  add(url: string, { body }): Observable<T> {
    return this.fetch(EMethod.POST)(url)({ body }).pipe(
      tap({
        next: (_value: T) => {
          const values: T[] = [...this.vm$.value, _value];
          this.vm$.next(values);
          return _value;
        }
      })
    );
  }

  edit(url: string, { body }, identifier = 'id'): Observable<T> {
    return this.fetch(EMethod.PUT)(url)({ body }).pipe(
      tap({
        next: (_value: T) => this.editValue(body, _value, identifier)
      })
    );
  }

  modify(url: string, { body }, identifier = 'id'): Observable<T> {
    return this.fetch(EMethod.PATCH)(url)({ body }).pipe(
      tap({
        next: (_value: T) => this.editValue(body, _value, identifier)
      })
    );
  }

  private editValue(value: T, _value: T, identifier: string): T {
    if (!Object.keys(value).includes(identifier.trim().toLowerCase())) {
      throw new Error('Identifier key does not exist on the current type.');
    }

    const values: T[] = [...this.vm$.value];
    const index: number = values.findIndex((item: T) => isEqual(item[identifier], value[identifier]));
    values[index] = _value;

    this.vm$.next(values);
    return _value;
  }

  delete(url: string, object: T): Observable<{}> {
    return this.fetch(EMethod.DELETE)(url)({}).pipe(
      tap({
        next: () => {
          const values: T[] = this.vm$.value.filter((value: T) => !isEqual(value, object));
          this.vm$.next(values);
        }
      })
    );
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
