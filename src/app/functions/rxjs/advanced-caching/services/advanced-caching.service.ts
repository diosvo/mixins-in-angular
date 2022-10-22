import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '@lib/models/json-placeholder/comment.model';
import { BaseService } from '@lib/services/base/base.service';
import { ErrorHandlerService } from '@lib/services/base/error-handler.service';
import { CommentsService } from '@lib/services/json-placeholder/comments/comments.service';
import { Observable, shareReplay, Subject, switchMap, takeUntil, timer } from 'rxjs';

const CACHE_SIZE = 1 as const;
const REFRESH_INTERVAL = 10000 as const;

@Injectable({
  providedIn: 'root'
})
export class AdvancedCachingService extends BaseService<Comment>  {

  private cache$: Observable<Comment[]>;
  private reload$ = new Subject<void>();

  constructor(
    protected readonly http: HttpClient,
    private readonly service: CommentsService,
    protected readonly handle: ErrorHandlerService,
  ) {
    super(http, handle);
  }

  get comments(): Observable<Comment[]> {
    if (!this.cache$) {
      const timer$ = timer(0, REFRESH_INTERVAL);

      this.cache$ = timer$.pipe(
        switchMap(() => this.pushComments()),
        takeUntil(this.reload$),
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }

  forceReload(): void {
    this.reload$.next(); // calling the next will complete the current cache instance
    this.cache$ = null; // setting the cache to null will create a new cache; the next time 'comments' is called
  }

  private pushComments(): Observable<Comment[]> {
    const params = {
      _start: Math.floor((Math.random() * 100) + 1),
      _limit: 5
    };
    return this.service.filtered(params);
  }
}
