import { Observable, shareReplay, startWith, Subject, switchMap } from 'rxjs';

export interface HttpCacheStorage {
  setItem(key: string, item: Observable<unknown>): void;
  getItem(key: string): Observable<any> | undefined;
}

interface HttpCacheOptions {
  // Save shared observables
  storage: HttpCacheStorage;
  // An Observable stream or a Subject.
  // Which is used as an  invalidation trigger.
  refreshSubject: Observable<unknown> | Subject<unknown>;
}

type HttpRequestCacheMethod = (...args: Array<unknown>) => Observable<any>;

/**
 * @key string
 * @value T<any>
 * @returns Method descriptor, which will be applied to a class method before class initialization.
 */

export function HttpRequestCache<T extends Record<string, any>>(
  optionHandlers: (this: T) => HttpCacheOptions
) {
  return (
    target: T,
    methodName: string,
    descriptors: TypedPropertyDescriptor<HttpRequestCacheMethod>
  ): TypedPropertyDescriptor<HttpRequestCacheMethod> => {

    if (!(descriptors?.value instanceof Function)) {
      throw Error('\'@HttpRequestCache\' can be applied only to the class method which returns Observable');
    }

    const cacheKeyPrefix = `${target.constructor.name}_${methodName}`;
    const originalMethod = descriptors.value;

    descriptors.value = function (...args: Array<unknown>): Observable<unknown> {
      const { storage, refreshSubject } = optionHandlers.call(this);
      const key = `${cacheKeyPrefix}_${JSON.stringify(args)}`;
      let observable = storage.getItem(key);

      if (observable) {
        return observable;
      }

      observable = refreshSubject.pipe(
        startWith(true),
        switchMap(() => originalMethod.apply(this, args)),
        shareReplay(1)
      );

      storage.setItem(key, observable);
      return observable;
    };

    return descriptors;
  };
}