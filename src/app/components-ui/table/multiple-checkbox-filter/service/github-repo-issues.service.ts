import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { HandleService } from '@lib/services/base/handle.service';
import { CacheService } from '@lib/services/cache/cache.service';
import { HttpRequestCache } from '@lib/services/cache/http-request-cache';
import { Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { GithubApi } from '../models/service.model';

@Injectable()

export class GithubRepoIssuesService {

  private readonly refreshSubject = new Subject();

  constructor(
    private http: HttpClient,
    private readonly cache: CacheService,
    private readonly handle: HandleService,
  ) { }

  @HttpRequestCache<GithubRepoIssuesService>(function () {
    return {
      storage: this.cache,
      refreshSubject: this.refreshSubject
    };
  })

  getRepoIssues(sort: string, order: SortDirection, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<GithubApi>(requestUrl).pipe(
      this.handle.retryServerErrors(),
      shareReplay(),
    );
  }

  refreshIssues(): void {
    this.refreshSubject.next(true);
  }
}
