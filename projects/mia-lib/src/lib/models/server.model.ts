import { HttpErrorResponse } from '@angular/common/http';
import { pipe, startWith } from 'rxjs';

interface HttpRequestState<T> {
  data: T[];
  loading?: boolean;
  total_count?: number;
  message?: HttpErrorResponse | Error;
}

const DEFAULT_STATE = {
  data: null,
  loading: true,
  message: null,
  total_count: 0
};

const initialValues = () => pipe(
  startWith(DEFAULT_STATE)
);

export { HttpRequestState, DEFAULT_STATE, initialValues };

