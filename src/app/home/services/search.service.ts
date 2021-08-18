import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ILogger, LOGGER } from '@lib/services/log/logger';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map, shareReplay } from 'rxjs/operators';
import { IGroupValue } from '../models/search.model';
import { EUrl } from '../models/url.enum';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  private loading$ = new BehaviorSubject<boolean>(true);

  uiComponentsList$ = this.http.get<Array<IGroupValue>>(`/assets/backend/list-items/${EUrl.COMPONENT}.json`)
    .pipe(
      map(data => data.map(item => ({ ...item, groupUrl: EUrl.COMPONENT }))),
      shareReplay(),
      catchError(_ => of(null)),
      finalize(() => this.loading$.next(false)),
    );

  webUiList$ = this.http.get<Array<IGroupValue>>(`/assets/backend/list-items/${EUrl.WEB}.json`)
    .pipe(
      map(data => data.map(item => ({ ...item, groupUrl: EUrl.WEB }))),
      shareReplay(),
      catchError(_ => of(null)),
      finalize(() => this.loading$.next(false)),
    );

  functionsList$ = this.http.get<Array<IGroupValue>>(`/assets/backend/list-items/${EUrl.FUNCTION}.json`)
    .pipe(
      map(data => data.map(item => ({ ...item, groupUrl: EUrl.FUNCTION }))),
      shareReplay(),
      catchError(_ => of(null)),
      finalize(() => this.loading$.next(false)),
    );

  constructor(
    private http: HttpClient,
    @Inject(LOGGER) private logger: ILogger
  ) {
    this.loading$.next(true);
  }

  getLoading(): Observable<boolean> {
    return this.loading$;
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
}
