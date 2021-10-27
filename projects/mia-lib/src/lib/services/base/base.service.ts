import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {
   model?: T;

  constructor() { }

  protected all(): Observable<Array<T>> {
    return of(Array(this.model));
  }

  protected byId(id: number | string): Observable<T> {
    return of(this.model);
  }

  protected create(params: T): Observable<T> {
    return of(this.model);
  }

  protected update(params: T): Observable<T> {
    return of(this.model);
  }

  protected delete(id: number | string): Observable<T> {
    return of(this.model);
  }
}
