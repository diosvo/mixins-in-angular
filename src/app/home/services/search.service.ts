import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Params } from '@angular/router';
import { EUrl } from '@home/models/url.enum';
import { HttpRequestState, initialValues } from '@lib/models/server.model';
import { FilterObjectPipe } from '@lib/pipes/filter.pipe';
import isEmpty from 'lodash.isempty';
import { catchError, combineLatest, map, Observable, of, shareReplay } from 'rxjs';

export interface CardItem {
  name: string;
  group_id: string;
  routing_path: EUrl;
  description: string;
}

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  constructor(private readonly firestore: AngularFirestore) { }

  getData(group_url: EUrl, params$: Observable<Params>, selection: string[]): Observable<HttpRequestState<CardItem[]>> {
    const data$ = this.firestore.collection(group_url, ref => ref.orderBy('group_id')).valueChanges();
    return combineLatest([data$, params$]).pipe(
      map(([data, params]) => {
        const filtered = data.filter((item: CardItem) => {
          const byGroup = (isEmpty(params.group) ? selection : params.group).includes(item.group_id);
          const byQuery = new FilterObjectPipe().transform(item.name, params.query);
          return byGroup && byQuery;
        });
        return {
          data: filtered,
          loading: false
        };
      }),
      catchError(({ message }) => of({ message, loading: false })),
      initialValues(),
      shareReplay(1),
    ) as Observable<HttpRequestState<CardItem[]>>;
  }
}
