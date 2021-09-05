import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map, shareReplay } from 'rxjs/operators';
import { IGroupValue } from '../models/search.model';
import { EUrl } from '../models/url.enum';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  // Web is temporarily inactive
  private uiLoading$ = new BehaviorSubject<boolean>(true);
  private webLoading$ = new BehaviorSubject<boolean>(true);
  private funcLoading$ = new BehaviorSubject<boolean>(true);

  uiComponentsList$ = this.http.get<Array<IGroupValue>>(this.getDataFrom(EUrl.COMPONENT))
    .pipe(
      map((data: Array<IGroupValue>) => data.map(item => ({ ...item, groupUrl: EUrl.COMPONENT }))),
      map(group => group.sort((prev, next) => prev.groupName < next.groupName ? -1 : 1)),
      shareReplay(),
      catchError(_ => of(null)),
      finalize(() => this.uiLoading$.next(false)),
    );

  webUiList$ = this.http.get<Array<IGroupValue>>(this.getDataFrom(EUrl.WEB))
    .pipe(
      map((data: Array<IGroupValue>) => data.map(item => ({ ...item, groupUrl: EUrl.WEB }))),
      shareReplay(),
      catchError(_ => of(null)),
      finalize(() => this.webLoading$.next(false)),
    );

  functionsList$ = this.http.get<Array<IGroupValue>>(this.getDataFrom(EUrl.FUNCTION))
    .pipe(
      map((data: Array<IGroupValue>) => data.map(item => ({ ...item, groupUrl: EUrl.FUNCTION }))),
      map(group => group.sort((prev, next) => prev.groupName < next.groupName ? -1 : 1)),
      shareReplay(),
      catchError(_ => of(null)),
      finalize(() => this.funcLoading$.next(false)),
    );

  constructor(
    private http: HttpClient
  ) {
    this.uiLoading$.next(true);
    this.webLoading$.next(true);
    this.funcLoading$.next(true);
  }

  getUiLoading(): BehaviorSubject<boolean> {
    return this.uiLoading$;
  }

  getWebLoading(): BehaviorSubject<boolean> {
    return this.webLoading$;
  }

  getFuncLoading(): BehaviorSubject<boolean> {
    return this.funcLoading$;
  }

  onFilter(session: EUrl, q: string): Observable<Array<IGroupValue>> {
    return this.uiComponentsList$
      .pipe(
        map((items: Array<IGroupValue>) =>
          items
            .map(item => ({
              groupName: item.groupName,
              groupDetails: item.groupDetails.filter(
                details => details.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
              ),
              groupUrl: session
            }))
            .filter(item => item.groupDetails.length > 0)
        )
      );
  }

  private getDataFrom(url: EUrl): string {
    return `/assets/backend/list-items/${url}.json`;
  }
}
