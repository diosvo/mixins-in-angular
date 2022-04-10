import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe<T> implements PipeTransform {

  transform(data: Array<T>, searchTerm: string): Array<T> {
    const modifySearch = searchTerm.trim().toLowerCase();

    if (!data || !modifySearch) {
      return data;
    }

    return data.filter((item: T) => this.filterFn(item, modifySearch));
  }

  private filterFn(data: T, value: string): boolean {
    const predicate = (text: T) =>
      new RegExp(value, 'gi').test(text.toString().trim().toLowerCase());

    return data instanceof Object
      ? Object.keys(data).map((key: string) => predicate(data[key])).some((results: boolean) => results)
      : predicate(data);
  }
}

@NgModule({
  declarations: [FilterPipe],
  exports: [FilterPipe],
})
export class FilterPipeModule { }