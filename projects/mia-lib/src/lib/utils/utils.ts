import { inject, InjectionToken } from '@angular/core';

const hasDuplicates = (array: Array<unknown>) => new Set(array).size !== array.length;

const LOCAL_STORAGE = new InjectionToken<Storage>(
  'An abstraction over window.localStorage object',
  {
    factory: () => inject(Window).localStorage
  }
);

export { hasDuplicates, LOCAL_STORAGE };

