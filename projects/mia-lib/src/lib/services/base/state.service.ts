import { HttpErrorResponse } from '@angular/common/http';
import { Params } from '@angular/router';
import { Pagination } from '@lib/models/table';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

interface IState<T> {
  data: T[];
  params: Params;
  loading: boolean;
  pagination: Pagination;
  error: HttpErrorResponse | Error | string;
}

export type State<T> = Partial<IState<T>>;

export class StateService<T> {
  private state$: BehaviorSubject<T>;

  /**
   * @returns the current snapshot state 
   */
  protected get state(): T {
    return this.state$.getValue();
  }

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  /**
   * @description takes a callback function, that is called when $state emits a new state
   */
  protected select<K>(mapFn: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  /**
   * @description allows us to be lazy and pass only some properties of a bigger state interface
   */
  protected setState(newState: Partial<T>): void {
    this.state$.next({
      ...this.state,
      ...newState
    });
  }
}