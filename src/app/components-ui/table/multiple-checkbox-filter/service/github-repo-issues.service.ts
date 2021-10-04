import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { GithubApi } from '../models/service.model';

@Injectable()

export class GithubRepoIssuesService {
  error$ = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getRepoIssues(sort: string, order: SortDirection, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<GithubApi>(requestUrl).pipe(
      shareReplay(),
      catchError((error: HttpErrorResponse) => {
        this.error$.next(!error.ok);
        return throwError(() => error.message);
      })
    );
  }
}
