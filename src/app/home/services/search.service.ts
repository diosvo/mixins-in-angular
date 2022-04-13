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

  uiComponentsList$ = this.getFetch(EUrl.COMPONENT, 'uiComponentsList');
  functionsList$ = this.getFetch(EUrl.FUNCTION, 'functionsList');
  core$ = this.getFetch(EUrl.CORE, 'core');

  constructor(
    private readonly http: HttpClient,
    private readonly handle: HandleService
  ) { }

  private getFetch(groupUrl: EUrl, method: string): Observable<IGroupValue[]> {
    return this.http.get(`/assets/backend/list-items/${groupUrl}.json`).pipe(
      map((data: IGroupValue[]) => data.map(item => ({ ...item, groupUrl }))),
      shareReplay(),
      catchError(this.handle.errorHandler(`${this.constructor.name}: ${method}`))
    );
  }
}
