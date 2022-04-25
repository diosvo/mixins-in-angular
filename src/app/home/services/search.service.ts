import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGroupValue } from '@home/models/search.model';
import { EUrl } from '@home/models/url.enum';
import { BaseService } from '@lib/services/base/base.service';
import { HandleService } from '@lib/services/base/handle.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SearchService extends BaseService<IGroupValue> {

  uiComponentsList$ = this.getFetch(EUrl.COMPONENT);
  functionsList$ = this.getFetch(EUrl.FUNCTION);
  core$ = this.getFetch(EUrl.CORE);

  constructor(
    protected readonly http: HttpClient,
    protected readonly handle: HandleService
  ) {
    super(http, handle);
  }

  private getFetch(groupUrl: EUrl): Observable<IGroupValue[]> {
    return this.list(`/assets/backend/list-items/${groupUrl}.json`).pipe(
      map((data: IGroupValue[]) => data.map(item => ({ ...item, groupUrl }))),
    );
  }
}
