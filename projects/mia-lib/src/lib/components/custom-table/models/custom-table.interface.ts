export namespace Table {
  export interface Column {
    header: string;
    columnDef: string;
    disableSorting?: boolean;
  }

  export enum Action {
    EDIT = 'edit',
    DELETE = 'delete',
    VIEW = 'view',
  }
}