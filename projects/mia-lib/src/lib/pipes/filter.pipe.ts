import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe<T> implements PipeTransform {

  private isNull = (text: unknown) => text === null;
  private isUndefined = (text: unknown) => text === undefined;

  private modify = (text: unknown): string => !this.isNull(text) && text.toString().trim().toLowerCase();

  transform(data: Array<T>, searchTerm: unknown): Array<T> {
    this.errorsHandler(data, searchTerm);

    if (!data || !this.modify(searchTerm)) {
      return data;
    }

    return data.filter((item: T) => this.filterFn(item, this.modify(searchTerm)));
  }

  private filterFn(data: T, value: string): boolean {
    const predicate = (text: T) => new RegExp(value, 'gi').test(this.modify(text));

    return data instanceof Object
      ? Object.keys(data).map((key: string) => predicate(data[key])).some((results: boolean) => results)
      : predicate(data);
  }

  private errorsHandler(data: Array<T>, searchTerm: unknown): void {
    if (!Array.isArray(data)) {
      throw new Error('Provided data should be an array.');
    }

    if (this.isUndefined(searchTerm)) {
      throw new Error('Query has not been provided.');
    }

    if (!this.isNull(searchTerm) && typeof searchTerm !== 'string') {
      throw new Error('The type of query should be string.');
    }
  }
}

@NgModule({
  declarations: [FilterPipe],
  exports: [FilterPipe],
})
export class FilterPipeModule { }