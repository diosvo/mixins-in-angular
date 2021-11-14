export namespace Table {
  export interface DataSource<T> {
    data: T[];
  }

  export interface Column {
    header: string;
    columnDef: string;
    disableSorting?: boolean;
  }

  export enum Action {
    EDIT = 'edit',
    DELETE = 'delete',
  }
}