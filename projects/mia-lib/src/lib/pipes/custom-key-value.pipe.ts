import { KeyValue, KeyValuePipe } from '@angular/common';
import { KeyValueDiffers, Pipe, PipeTransform } from '@angular/core';

enum ESortBy {
  KEY = 'key',
  VALUE = 'value',
}

type SortBy = Lowercase<keyof typeof ESortBy>;

@Pipe({
  name: 'keyvalue',
  standalone: true
})
export class CustomKeyValuePipe<K, V> implements PipeTransform {

  constructor(private readonly differs: KeyValueDiffers) { };

  transform(object: ReadonlyMap<K, V>, type: SortBy = null): KeyValue<K, V>[] {
    const pipe = new KeyValuePipe(this.differs);

    const compareFn = (prev: KeyValue<K, V>, next: KeyValue<K, V>): number => {
      const localeCompare = (by: ESortBy) => prev[by].toString().localeCompare(next[by].toString());

      switch (type) {
        case ESortBy.KEY:
          return localeCompare(ESortBy.KEY);
        case ESortBy.VALUE:
          return localeCompare(ESortBy.VALUE);
        default:
          return undefined; // preserve original property order
      }
    };

    return pipe.transform(object, compareFn);
  }

}
