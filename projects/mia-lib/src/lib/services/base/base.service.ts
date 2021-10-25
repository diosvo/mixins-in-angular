import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {
  protected model?: T;

  constructor(protected endpoint: string) { }

  protected all(): Observable<Array<T>> {
    return of(Array(this.model));
  }

  protected byId(id: number | string): Observable<T> {
    return of(this.model);
  }

  protected create<TParams>(params: TParams): Observable<T> {
    return of(this.model);
  }

  protected update<TParams>(id: number | string, params: TParams): Observable<T> {
    return of(this.model);
  }

  protected delete(id: number | string): Observable<T> {
    return of(this.model);
  }
}
