import { HttpErrorResponse } from '@angular/common/http';
import { Params } from '@angular/router';
import { Pagination } from './table';

interface IState<T> {
  data: T[];
  params: Params;
  loading: boolean;
  pagination: Pagination;
  error: HttpErrorResponse | Error | string;
}

export type State<T> = Partial<IState<T>>;