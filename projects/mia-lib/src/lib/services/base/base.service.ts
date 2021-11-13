import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {
  model?: T;

  constructor() { }

  all(): Observable<Array<T>> {
    return of(Array(this.model));
  }

  byId(id: number | string): Observable<T> {
    return of(this.model);
  }

  create(params: T): Observable<T> {
    return of(this.model);
  }

  update(params: T): Observable<T> {
    return of(this.model);
  }

  delete(id: number | string): Observable<T> {
    return of(this.model);
  }
}
