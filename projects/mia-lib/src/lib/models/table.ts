import { SortDirection } from '@angular/material/sort';

interface Pagination {
  limit: number;
  start: number;
  sort: string; // depended on key
  order: SortDirection;
}

enum EAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

type BulkAction = Lowercase<keyof typeof EAction>;

export { Pagination, EAction, BulkAction };
