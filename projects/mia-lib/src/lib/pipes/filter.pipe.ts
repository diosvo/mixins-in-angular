import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe<T> implements PipeTransform {

  transform(data: Array<T>, searchTerm: string): Array<T> {
    if (!data || !searchTerm) {
      return data;
    }

    return data.filter((item: T) => this.filterFn(item, searchTerm));
  }

  private filterFn(data: T, value: string): boolean {
    return Object.keys(data)
      .map((key: string) => new RegExp(value, 'gi').test(data[key]))
      .some((results: boolean) => results);
  }
}

@NgModule({
  declarations: [FilterPipe],
  exports: [FilterPipe],
})
export class FilterPipeModule { }