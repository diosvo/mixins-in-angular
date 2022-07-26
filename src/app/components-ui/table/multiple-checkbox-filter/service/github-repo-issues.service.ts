import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@lib/services/base/base.service';
import { HandleService } from '@lib/services/base/handle.service';
import { Observable } from 'rxjs';

export interface AngularIssue {
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
  items: AngularIssue[];
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

  getRepoIssues(page: number): Observable<ResponseApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&page=${page + 1}`;

    return this.get(requestUrl);
  }
}
