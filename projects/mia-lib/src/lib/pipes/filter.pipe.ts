import { NgModule, Pipe, PipeTransform } from '@angular/core';
import isEmpty from 'lodash.isempty';
import isUndefined from 'lodash.isundefined';

@Pipe({
  name: 'filter'
})
export class FilterPipe<T> implements PipeTransform {

  private modify = (text: unknown): string => !isEmpty(text) && text.toString().trim().toLowerCase();

  transform(data: T[], query: unknown): T[] {
    this.errorsHandler(data, query);

    if (!data || !this.modify(query)) {
      return data;
    }

    return data.filter((item: T) => this.filterFn(item, this.modify(query)));
  }

  private filterFn(subject: T, query: string): boolean {
    const predicate = (text: T) => new RegExp(query, 'gi').test(this.modify(text));

    return subject instanceof Object
      ? Object.keys(subject).map((key: string) => predicate(subject[key])).some((results: boolean) => results)
      : predicate(subject);
  }

  private errorsHandler(data: T[], searchTerm: unknown): void {
    if (!Array.isArray(data)) {
      throw new Error('Provided data should be an array.');
    }

    if (isUndefined(searchTerm)) {
      throw new Error('Query has not been provided.');
    }

    if (!isEmpty(searchTerm) && typeof searchTerm !== 'string') {
      throw new Error('The type of query should be string.');
    }
  }
}

@NgModule({
  declarations: [FilterPipe],
  exports: [FilterPipe],
})
export class FilterPipeModule { }