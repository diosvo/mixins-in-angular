import { SortDirection } from '@angular/material/sort';

interface PaginateParams {
  limit: number;
  start: number;
  sort: string; // depended on key
  order: SortDirection;
}

const DEFAULT_PAGINATE_PARAMS: PaginateParams = {
  limit: 100,
  start: 0,
  sort: 'id',
  order: 'asc'
};

function concatQueries(params: PaginateParams): string {
  const queries = `?_start=${params.start}&_limit=${params.limit}`;
  const sort = `&_order=${params.order}&_sort=${params.sort}`;
  return params.order && params.sort ? queries.concat(sort) : queries;
}

export { PaginateParams, DEFAULT_PAGINATE_PARAMS, concatQueries };
