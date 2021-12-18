import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleService } from '@lib/services/base/handle.service';
import { CacheService } from '@lib/services/cache/cache.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GithubApi, GithubIssue } from '../models/service.model';

@Injectable()

export class GithubRepoIssuesService {

  constructor(
    private http: HttpClient,
    private readonly cache: CacheService,
    private readonly handle: HandleService,
  ) { }

  getRepoIssues(): Observable<GithubIssue[]> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components`;

    return this.http.get<GithubApi>(requestUrl).pipe(
      map(data => data.items),
      this.handle.retryServerErrors(),
      shareReplay(),
    );
  }
}
