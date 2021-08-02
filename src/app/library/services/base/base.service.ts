import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {
  protected model!: T;

  all(): Observable<Array<T>> {
    return of(Array(this.model));
  }

  byId(id: number): Observable<T> {
    return of(this.model);
  }

  create(id: number): Observable<T> {
    return of(this.model);
  }

  update(id: number): Observable<T> {
    return of(this.model);
  }

  delete(id: number): Observable<T> {
    return of(this.model);
  }
}
