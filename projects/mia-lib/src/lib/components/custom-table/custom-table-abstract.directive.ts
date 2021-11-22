import { Directive, Input } from '@angular/core';

type TableColumn<T> = keyof T | string; // some cases when a static column is not an attribute of the entity (eg: action, ...)

@Directive()
export abstract class CustomTableAbstractDirective<T> {

  _columns!: TableColumn<T>[]; // columns need to be displayed; corresponding with entity's property
  dynamicColumns: TableColumn<T>[] = [];

  // setter for columns to refresh the other columns attribute

  @Input() set columns(columns: TableColumn<T>[]) {
    this._columns = columns;
    this.updateColumns();
  }

  protected constructor(protected staticColumns?: TableColumn<T>[]) {
    this.updateColumns();
  }

  updateColumns(): void {
    if (this._columns && this.staticColumns) {
      this.dynamicColumns = this.getDynamicColumns(this._columns, this.staticColumns);
    }
  }

  private getDynamicColumns(columns: TableColumn<T>[], staticColumns: TableColumn<T>[]): TableColumn<T>[] {
    const dynamicColumns: TableColumn<T>[] = [];

    for (const column of columns) {
      //  if the column is not in the static list, add it to the dynamic list
      if (staticColumns.indexOf(column) === -1) {
        dynamicColumns.push(column);
      }
    }

    return dynamicColumns;
  }
}
