import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe<T> implements PipeTransform {

  private modify = (text: string | T) => text.toString().trim().toLowerCase();

  transform(data: Array<T>, searchTerm: string): Array<T> {

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
}

@NgModule({
  declarations: [FilterPipe],
  exports: [FilterPipe],
})
export class FilterPipeModule { }