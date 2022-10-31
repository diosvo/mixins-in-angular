import { Params } from '@angular/router';
import isUndefined from 'lodash.isundefined';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

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
  protected setState(newState: T): void {
    this.state$.next({
      ...this.state,
      ...newState
    });
  }

  /**
   * @param data the collection to iterate over.
   * @param params a collection of matrix and query URL parameters
   * @param keys provided keys to query search term
   * @description returns the correct results only when the item key and param key are the same
   */
  filteredData<K>(data: K[], params: Params, keys: string[]): K[] {
    return data.filter((item: K) => {
      const { query = '', ...rest } = params;
      const searchTerms = keys
        .filter((key: string) => Object.keys(item).includes(key) && !isUndefined(item[key]))
        .reduce((accumulator, key) => accumulator.concat(item[key]), '');

      const parsed = (value: unknown) => value.toString().trim().toLowerCase();
      const matched = (param_value: string, item_value: unknown) => param_value
        .replace(/\s*,\s*|\s+,/g, ' ').match(/\b\S+\b/g)
        .includes(parsed(item_value));

      return parsed(searchTerms).includes(parsed(query))
        && Object.keys(rest).every((key: string) => matched(rest[key], item[key]));
    });
  }
}