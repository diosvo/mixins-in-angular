import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EUrl } from '@home/models/url.enum';
import { HttpRequestState, initialValues } from '@lib/models/server.model';
import { HandleService } from '@lib/services/base/handle.service';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';

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

  uiComponentsList$ = this.getFetch(EUrl.COMPONENT);
  functionsList$ = this.getFetch(EUrl.FUNCTION);

  constructor(
    private readonly handle: HandleService,
    private readonly firestore: AngularFirestore,
  ) { }

  private getFetch(group_url: EUrl): Observable<CardItem[]> {
    return this.firestore.collection(group_url, ref => ref.orderBy('group_id')).valueChanges().pipe(
      shareReplay(1),
      catchError(this.handle.errorHandler('SearchService'))
    ) as Observable<CardItem[]>;
  }

  getData(group_url: EUrl): Observable<HttpRequestState<CardItem[]>> {
    // TODO: combine getFetch and queries state
    return this.getFetch(group_url).pipe(
      map((data: CardItem[]) => ({ data, loading: false })),
      catchError(({ message }) => of({ message, loading: false })),
      initialValues(),
    ) as Observable<HttpRequestState<CardItem[]>>;
  }
}
