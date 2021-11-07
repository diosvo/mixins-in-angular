export namespace Table {
  export interface Pagination {
    enablePagination: boolean;
    pageSize: number;
    pageSizeOptions: number[];
    showFirstLastButtons: boolean;
  }

  export interface Column {
    icon?: string;
    name: string;  // used for fetching/binding data
    displayName: string;
    disableSorting?: boolean;
  }

  export enum ActionButton {
    EDIT = 'edit',
    DELETE = 'delete',
    VIEW = 'view',
  }
}