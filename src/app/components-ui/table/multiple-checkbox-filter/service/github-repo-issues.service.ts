import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { HandleServerService } from '@lib/services/base/handle-server.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { GithubApi } from '../models/service.model';

@Injectable()

export class GithubRepoIssuesService {

  constructor(
    private http: HttpClient,
    readonly handleServer: HandleServerService
  ) { }

  getRepoIssues(sort: string, order: SortDirection, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<GithubApi>(requestUrl).pipe(
      this.handleServer.retryServerErrors(),
      shareReplay(),
    );
  }
}
