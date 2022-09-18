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

function concatQueries(params: Pagination): string {
  const queries = `?_start=${params.offset}&_limit=${params.limit}`;
  const sort = `&_order=${params.order}&_sort=${params.sort}`;
  return params.order && params.sort ? queries.concat(sort) : queries;
}

export { Pagination, DEFAULT_PAGINATE_PARAMS, concatQueries };
