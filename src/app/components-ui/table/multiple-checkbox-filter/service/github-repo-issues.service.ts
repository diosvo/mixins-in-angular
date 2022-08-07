import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BaseService } from '@lib/services/base/base.service';
import { HandleService } from '@lib/services/base/handle.service';
import { Observable } from 'rxjs';

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

export interface ResponseApi {
  items: Issue[];
  total_count: number;
}

@Injectable()

export class GithubRepoIssuesService extends BaseService<ResponseApi> {

  constructor(
    protected readonly http: HttpClient,
    protected readonly handle: HandleService
  ) {
    super(http, handle);
  }

  getRepoIssues(params: Params): Observable<ResponseApi> {
    const { page, states } = params;

    const base_url = `https://api.github.com/search/issues?q=${states.join().replace(',', ' ')}`;
    const request_api = page ? base_url.concat(`&page=${+page + 1}`) : base_url;

    return this.get(request_api);
  }
}
