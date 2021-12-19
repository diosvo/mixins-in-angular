import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleService } from '@lib/services/base/handle.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { GithubApi } from '../models/service.model';

@Injectable()

export class GithubRepoIssuesService {

  constructor(
    private readonly http: HttpClient,
    private readonly handle: HandleService,
  ) { }

  getRepoIssues(page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&page=${page + 1}`;

    return this.http.get<GithubApi>(requestUrl).pipe(
      this.handle.retryServerErrors(),
      shareReplay(),
    );
  }
}
