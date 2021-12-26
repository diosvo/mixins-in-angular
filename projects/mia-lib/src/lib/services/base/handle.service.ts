import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { combineLatest, interval, map, mergeMap, Observable, of, pipe, retryWhen, take, throwError, TimeoutError } from 'rxjs';

export interface FilterSchema {
  [property: string]: {
    type: 'string' | 'number' | 'array' | 'boolean';
    enums?: Array<string | number>,
  }
}

@Injectable({
  providedIn: 'root'
})

export class HandleService {
  isServerError = (error: HttpErrorResponse) => error.status >= HttpStatusCode.InternalServerError;

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

  errorHandler = (name: string) => (error: HttpErrorResponse | TimeoutError) => {
    if (error instanceof TimeoutError) {
      return throwError(() => new Error(isDevMode() ? `Request timeout. (${name})` : 'Request Timeout'));
    }
    if (error instanceof HttpErrorResponse) {
      return throwError(() => new Error(isDevMode() ? `${error.message} (${name})` : `${error.message}`));
    }
  }

  filteredData = <T>(data$: Observable<Array<T>>, valueChanges$: Observable<Record<string, unknown>>, schemas: FilterSchema) => {
    const string_values = Object.keys(schemas)
      .filter((key: string) => schemas[key].type === 'string')
      .filter((key: string) => key !== 'query');

    return combineLatest([data$, valueChanges$, of(schemas)]).pipe(
      map(([data, params, schemas]): Array<T> =>
        data.filter((item: T): boolean => {
          let conditions = true;
          const filterValues = JSON.parse(JSON.stringify(params));

          for (const key in filterValues) {
            if (key === 'query') {
              let searchTerm: string = '';
              schemas.query.enums.forEach((property: string) => { searchTerm += item[property]; });
              conditions = conditions && searchTerm.toLowerCase().indexOf(filterValues.query.trim().toLowerCase()) !== -1;
            }
            else if (filterValues[key] !== null && filterValues[key].length) {
              conditions = conditions && filterValues[key].includes(item[key].trim().toLowerCase());
            }
          }

          return conditions;
        })
      )
    );
  }
}
