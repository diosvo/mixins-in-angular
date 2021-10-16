import { inject, InjectionToken } from '@angular/core';

const coerceToArray = <T>(value: T | Array<T>): Array<T> => (
  Array.isArray(value) ? value : [value]
);

const LOCAL_STORAGE = new InjectionToken<Storage>(
  'An abstraction over window.localStorage object',
  {
    factory: () => inject(Window).localStorage
  }
);

export { coerceToArray, LOCAL_STORAGE };

