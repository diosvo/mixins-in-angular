import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { ILogger, LOGGER } from 'src/app/library/services/log/logger';
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
      tap({
        complete: () => this.loading$.next(false)
      }),
      shareReplay(),
      catchError(_ => of(null))
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
