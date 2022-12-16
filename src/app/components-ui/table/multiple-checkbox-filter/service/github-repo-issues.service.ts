import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { State } from '@lib/models/server.model';
import { BaseService } from '@lib/services/base/base.service';
import { ErrorHandlerService } from '@lib/services/base/error-handler.service';
import { catchError, map, Observable, of, pluck, startWith } from 'rxjs';

export interface Issue {
  id: number;
  state: string;
  title: string;
  number: string;
  html_url: string;
  created_at: string;
  author_association: string;
  assignees: {
    login: string;
    avatar_url: string;
  }[]
}

interface Option {
  label: string;
  value: unknown;
}

@Injectable()
export class GithubRepoIssuesService extends BaseService<{ items: Issue[] }> {

  readonly FILTERS_OPTIONS: Record<string, Option[]> = {
    states: [
      { label: 'Open', value: 'is:\open' },
      { label: 'Closed', value: 'is:\closed' }
    ]
  };

  readonly DEFAULT_STATES = this.FILTERS_OPTIONS.states.map(({ value }) => value).join(' ');

  constructor(
    protected readonly http: HttpClient,
    protected readonly handle: ErrorHandlerService
  ) {
    super(http, handle);
  }

  getRepoIssues(queries: Params): Observable<State<Issue>> {
    const { states, page } = queries;

    const params = {
      page: page + 1,
      q: states,
    };

    if (typeof states === 'object') {
      params.q = this.DEFAULT_STATES;
    }

    return this.list('https://api.github.com/search/issues', params).pipe(
      pluck(('items')),
      map((data: Issue[]) => ({ data, loading: false })),
      catchError(({ message }) => of({ data: [], message, loading: false })),
      startWith({ data: [], loading: true }),
    );
  }
}
