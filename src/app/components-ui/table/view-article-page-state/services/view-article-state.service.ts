import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from '@env/environment';
import { DEFAULT_PAGINATE_PARAMS } from '@lib/models/table';
import { StateAtom } from '@lib/services/atom/atom.service';
import { combineLatest, debounceTime, distinctUntilChanged, filter, finalize, map, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { Article, Comment, initialArticleState, PaginateParams, ViewArticleState } from '../models/article.model';

@Injectable()
export class ViewArticleStateService {

  private currentState: ViewArticleState = initialArticleState;

  private id: StateAtom<number> = new StateAtom(initialArticleState.id);
  private article: StateAtom<Article> = new StateAtom(initialArticleState.article);
  private comments: StateAtom<Array<Comment>> = new StateAtom(initialArticleState.comments);
  private loading: StateAtom<boolean> = new StateAtom(initialArticleState.loading);
  private searchTerm: StateAtom<string> = new StateAtom(initialArticleState.searchTerm);
  private commentsPagination: StateAtom<PaginateParams> = new StateAtom(initialArticleState.commentsPagination);

  readonly state$: Observable<ViewArticleState> = combineLatest([
    this.id.value$,
    this.article.value$,
    this.comments.value$,
    this.loading.value$,
    this.searchTerm.value$,
    this.commentsPagination.value$
  ]).pipe(
    map(([id, article, comments, loading, searchTerm, commentsPagination]): ViewArticleState => ({ id, article, comments, loading, searchTerm, commentsPagination })),
    tap((state: ViewArticleState) => this.currentState = state)
  );

  constructor(
    private readonly http: HttpClient
  ) {
    this.handleEffects();
  }

  controlSearchTerm(initial: string = ''): FormControl {
    const control = new FormControl(initial);

    control.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((value: string) => this.searchTerm.update(value));

    return control;
  }

  updateArticleId(id: number): void {
    this.id.update(id);
  }

  updateStateFromQueryParams(params: { query, start, limit, sort }): void {
    const searchTerm = params?.query || '';
    const limit = +params?.limit || DEFAULT_PAGINATE_PARAMS.limit;
    const start = +params?.start || DEFAULT_PAGINATE_PARAMS.start;
    const sort = params?.sort || DEFAULT_PAGINATE_PARAMS.sort;

    this.searchTerm.update(searchTerm);
    this.updatePagination(start, limit, sort);
  }

  getStateSnapshot(): ViewArticleState {
    return { ...this.currentState };
  }

  resetState(): void {
    this.id.reset();
    this.article.reset();
    this.comments.reset();
    this.loading.reset();
    this.searchTerm.reset();
    this.commentsPagination.reset();
  }

  /**
   * @description load Articles list whenever the id changes
  */

  private handleEffects(): void {
    this.id.value$
      .pipe(
        filter((id: number) => !!id),
        tap(() => this.loading.update(true)),
        switchMap((id: number): Observable<Article> =>
          this.findById(id).pipe(
            finalize(() => this.loading.update(false))
          )
        ),
        shareReplay()
      )
      .subscribe({
        next: (article: Article) => this.article.update(article)
      });

    combineLatest([
      this.id.value$, this.searchTerm.value$, this.commentsPagination.value$
    ])
      .pipe(
        debounceTime(200),
        tap(() => this.loading.update(true)),
        switchMap(([id, searchTerm, params]): Observable<Array<Comment>> =>
          this.findCommentsByArticle(id, searchTerm, params).pipe(
            finalize(() => this.loading.update(false))
          )
        ),
        shareReplay()
      )
      .subscribe({
        next: (comments: Array<Comment>) => this.comments.update(comments)
      });
  }

  private updatePagination(
    start: number = DEFAULT_PAGINATE_PARAMS.start,
    limit: number = DEFAULT_PAGINATE_PARAMS.limit,
    sort: string = DEFAULT_PAGINATE_PARAMS.sort,
  ): void {
    this.commentsPagination.update({ start, limit, sort });
  }

  /**
   * @param id article id
   * @returns get Article by id
   * 
  */

  private findById(id: number): Observable<Article> {
    return this.http.get<Article>(environment.jsonPlaceHolderUrl + 'posts/' + id);
  }

  /**
   * @param id article id
   * @returns get list Comments by Article id
   * 
  */

  private findCommentsByArticle(id: number, searchTerm: string, params: PaginateParams): Observable<Array<Comment>> {
    return this.http.get<Array<Comment>>(
      environment.jsonPlaceHolderUrl + `comments?postId=${id}&_start=${params.start}&_limit=${params.limit}`
    );
  }
}
