import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGroupValue } from '@home/models/search.model';
import { EUrl } from '@home/models/url.enum';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  uiComponentsList$: Observable<Array<IGroupValue>> =
    this.http.get<Array<IGroupValue>>(this.path(EUrl.COMPONENT))
      .pipe(
        map((data: Array<IGroupValue>) => data.map(item => ({ ...item, groupUrl: EUrl.COMPONENT }))),
        shareReplay()
      );

  functionsList$ = this.http.get<Array<IGroupValue>>(this.path(EUrl.FUNCTION))
    .pipe(
      map((data: Array<IGroupValue>) => data.map(item => ({ ...item, groupUrl: EUrl.FUNCTION }))),
      shareReplay()
    );

  constructor(
    private http: HttpClient
  ) { }

  private path(url: EUrl): string {
    return `/assets/backend/list-items/${url}.json`;
  }
}
