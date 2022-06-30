import { NgModule, Pipe, PipeTransform } from '@angular/core';
import isEmpty from 'lodash.isempty';
import isUndefined from 'lodash.isundefined';

const modify = (text: unknown): string => text.toString().toLowerCase().trim();

@Pipe({
  name: 'filter'
})
export class FilterPipe<T> implements PipeTransform {

  transform(data: T[], query: string): T[] {
    this.errorsHandler(data, query);

    if (!data || !modify(query)) {
      return data;
    }

    return data.filter((item: T) => new FilterObjectPipe().transform(item, query));
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

@Pipe({
  name: 'primitive-filter'
})
export class FilterObjectPipe<T> implements PipeTransform {

  private prediction = (subject: T, query: string) => modify(subject).includes(modify(query));

  transform(subject: T, query: string): boolean {
    if (!subject || !modify(query)) {
      return true;
    }
    if (typeof subject !== 'object') {
      return this.prediction(subject, query);
    }
    return Object.keys(subject)
      .filter((key: string) => !!subject[key])
      .map((key: string) => this.prediction(subject[key], query))
      .some((matches: boolean) => matches);
  }
}

@NgModule({
  declarations: [FilterPipe, FilterObjectPipe],
  exports: [FilterPipe, FilterObjectPipe],
})
export class FilterPipeModule { }