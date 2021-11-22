import { LoggerService } from '@lib/services/log/logger.service';
import { Observable, Subject, takeUntil } from 'rxjs';

function isFunction(value: unknown): boolean {
  return typeof value === 'function';
}

export function TakeUntilDestroy(destroyMethodName = 'ngOnDestroy') {

  return function <T extends { new(...args: any[]): {} }>(constructor: T, logger: LoggerService) {

    const original = constructor.prototype[destroyMethodName];

    if (!isFunction(original)) {
      logger.error(`${constructor.name} is using @TakeUntilDestroy but does not implement ${destroyMethodName}`);
    }

    return class extends constructor {

      _destroyed$: Subject<boolean> = new Subject();

      get destroyed$(): Observable<boolean> {
        this._destroyed$ = this._destroyed$ || new Subject();
        return this._destroyed$.asObservable();
      }

      [destroyMethodName](): void {
        isFunction(original) && original.apply(this, arguments);
        this._destroyed$.next(true);
        this._destroyed$.complete();
      }
    };
  };
}

export const untilDestroyed = that => <T>(source: Observable<T>, logger: LoggerService): Observable<T> => {
  if (!('destroyed$' in that)) {
    logger.error(`'destroyed$' property does not exist on ${that.constructor.name}. Did you decorate the class with '@TakeUntilDestroy()'?`);
    return source;
  }

  return source.pipe(takeUntil<T>(that.destroyed$));
};