interface PaginateParams {
  limit: number;
  start: number;
  sort: string;
}

const DEFAULT_PAGINATE_PARAMS: PaginateParams = {
  limit: 10,
  start: 0,
  sort: ''
};

export { PaginateParams, DEFAULT_PAGINATE_PARAMS };
