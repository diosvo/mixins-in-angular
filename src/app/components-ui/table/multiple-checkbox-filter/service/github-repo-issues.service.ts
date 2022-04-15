import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@lib/services/base/base.service';
import { HandleService } from '@lib/services/base/handle.service';
import { Observable } from 'rxjs';
import { GithubApi } from '../models/service.model';

@Injectable()

export class GithubRepoIssuesService extends BaseService {

  constructor(
    protected readonly http: HttpClient,
    protected readonly handle: HandleService
  ) {
    super(http, handle);
  }

  getRepoIssues(page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&page=${page + 1}`;

    return this.get(requestUrl) as Observable<GithubApi>;
  }
}
