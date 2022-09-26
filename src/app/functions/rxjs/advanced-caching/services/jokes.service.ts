import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@lib/services/base/base.service';
import { ErrorHandlerService } from '@lib/services/base/error-handler.service';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { map, Observable, shareReplay, Subject, switchMap, takeUntil, timer } from 'rxjs';

export interface Joke {
  id: number;
  joke: string;
  categories: string[]
}

export interface JokeResponse {
  type: string;
  value: Joke[];
}

const CACHE_SIZE = 1 as const;
const REFRESH_INTERVAL = 10000 as const;
const API_ENDPOINT = 'https://api.icndb.com/jokes/random/10' as const;

@Injectable({
  providedIn: 'root'
})
export class JokesService extends BaseService<JokeResponse> {

  private cache$: Observable<Joke[]>;
  private reload$ = new Subject<void>();

  constructor(
    protected readonly http: HttpClient,
    protected readonly handle: ErrorHandlerService,
    private readonly destroy$: DestroyService
  ) {
    super(http, handle);
  }

  get jokes(): Observable<Joke[]> {
    if (!this.cache$) {
      const timer$ = timer(0, REFRESH_INTERVAL);

      this.cache$ = timer$.pipe(
        switchMap(() => this.requestJokes()),
        takeUntil(this.reload$),
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }

  forceReload(): void {
    this.reload$.next(); // calling the next will complete the current cache instance
    this.cache$ = null; // setting the cache to null will create a new cache; the next time 'jokes' is called
  }

  private requestJokes(): Observable<Joke[]> {
    return this.get(API_ENDPOINT).pipe(
      map(({ value }) => value),
      takeUntil(this.destroy$)
    );
  }
}
