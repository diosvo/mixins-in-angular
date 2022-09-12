import { State } from '@lib/models/server.model';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

export class StateService<T> {
  private state$: BehaviorSubject<State<T>>;

  /**
   * @returns the current snapshot state 
   */
  protected get state(): State<T> {
    return this.state$.getValue();
  }

  constructor(initialState: State<T>) {
    this.state$ = new BehaviorSubject<State<T>>(initialState);
  }

  /**
   * @description takes a callback function, that is called when $state emits a new state
   */
  protected select<K>(mapFn: (state: State<T>) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: State<T>) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  /**
   * @description allows us to be lazy and pass only some properties of a bigger state interface
   */
  protected setState(newState: State<T>): void {
    this.state$.next({
      ...this.state,
      ...newState
    });
  }
}