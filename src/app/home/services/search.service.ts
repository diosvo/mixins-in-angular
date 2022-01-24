import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGroupValue } from '@home/models/search.model';
import { EUrl } from '@home/models/url.enum';
import { HandleService } from '@lib/services/base/handle.service';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  uiComponentsList$: Observable<Array<IGroupValue>> =
    this.http.get<Array<IGroupValue>>(this.path(EUrl.COMPONENT)).pipe(
      map((data: Array<IGroupValue>) => data.map(item => ({ ...item, groupUrl: EUrl.COMPONENT }))),
      shareReplay(),
      catchError(this.handle.errorHandler(`${this.constructor.name}: uiComponentsList`))
    );

  functionsList$ = this.http.get<Array<IGroupValue>>(this.path(EUrl.FUNCTION)).pipe(
    map((data: Array<IGroupValue>) => data.map(item => ({ ...item, groupUrl: EUrl.FUNCTION }))),
    shareReplay(),
    catchError(this.handle.errorHandler(`${this.constructor.name}: functionsList`))
  );

  core$ = this.http.get<Array<IGroupValue>>(this.path(EUrl.CORE)).pipe(
    map((data: Array<IGroupValue>) => data.map(item => ({ ...item, groupUrl: EUrl.CORE }))),
    shareReplay(),
    catchError(this.handle.errorHandler(`${this.constructor.name}: core`))
  );

  constructor(
    private readonly http: HttpClient,
    private readonly handle: HandleService
  ) { }

  private path(url: EUrl): string {
    return `/assets/backend/list-items/${url}.json`;
  }
}
