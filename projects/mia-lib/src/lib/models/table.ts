import { SortDirection } from '@angular/material/sort';

interface Pagination {
  limit: number;
  offset: number;
  sort: string; // depended on key
  order: SortDirection;
}

const DEFAULT_PAGINATE_PARAMS: Pagination = {
  limit: 100,
  offset: 0,
  sort: 'id',
  order: 'asc'
};

enum EAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

type BulkAction = Lowercase<keyof typeof EAction>;

export { Pagination, EAction, BulkAction, DEFAULT_PAGINATE_PARAMS };
