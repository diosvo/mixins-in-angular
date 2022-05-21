import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SortDirection } from '@angular/material/sort';
import { environment } from '@env/environment';
import { concatQueries, DEFAULT_PAGINATE_PARAMS } from '@lib/models/table';
import { StateAtom } from '@lib/services/atom/atom.service';
import { BaseService } from '@lib/services/base/base.service';
import { HandleService } from '@lib/services/base/handle.service';
import { combineLatest, debounceTime, distinctUntilChanged, filter, finalize, map, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { Article, Comment, initialArticleState, PaginateParams, ViewArticleState } from '../models/article.model';

@Injectable()
export class ViewArticleStateService extends BaseService<unknown> {

  private currentState: ViewArticleState = initialArticleState;

  private id: StateAtom<number> = new StateAtom(initialArticleState.id);
  private article: StateAtom<Article> = new StateAtom(initialArticleState.article);
  private articles: StateAtom<Array<Article>> = new StateAtom(initialArticleState.articles);
  private comments: StateAtom<Array<Comment>> = new StateAtom(initialArticleState.comments);
  private loading: StateAtom<boolean> = new StateAtom(initialArticleState.loading);
  private searchTerm: StateAtom<string> = new StateAtom(initialArticleState.searchTerm);
  private paginate: StateAtom<PaginateParams> = new StateAtom(initialArticleState.paginate);

  readonly state$: Observable<ViewArticleState> = combineLatest([
    this.id.value$,
    this.article.value$,
    this.articles.value$,
    this.comments.value$,
    this.loading.value$,
    this.searchTerm.value$,
    this.paginate.value$
  ]).pipe(
    map(([id, article, articles, comments, loading, searchTerm, paginate]): ViewArticleState => ({ id, article, articles, comments, loading, searchTerm, paginate })),
    tap((state: ViewArticleState) => this.currentState = state)
  );

  constructor(
    protected readonly http: HttpClient,
    protected readonly handle: HandleService
  ) {
    super(http, handle);
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

  updateStateFromQueryParams(params: Record<string, any>): void {
    const searchTerm = params?.query || '';
    const limit = +params?.limit || DEFAULT_PAGINATE_PARAMS.limit;
    const start = +params?.start || DEFAULT_PAGINATE_PARAMS.start;
    const order = params?.order || DEFAULT_PAGINATE_PARAMS.order;
    const sort = params?.sort || DEFAULT_PAGINATE_PARAMS.sort;

    this.searchTerm.update(searchTerm);
    this.updatePagination(start, limit, order, sort);
  }

  getStateSnapshot(): ViewArticleState {
    return { ...this.currentState };
  }

  resetState(): void {
    this.id.reset();
    this.article.reset();
    this.articles.reset();
    this.comments.reset();
    this.loading.reset();
    this.searchTerm.reset();
    this.paginate.reset();
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
        shareReplay(1)
      )
      .subscribe({
        next: (article: Article) => this.article.update(article)
      });

    combineLatest([
      this.id.value$, this.searchTerm.value$, this.paginate.value$
    ])
      .pipe(
        debounceTime(200),
        tap(() => this.loading.update(true)),
        switchMap(([id, searchTerm, params]): Observable<Comment[] | Article[]> =>
          id
            ? this.findCommentsByArticle(id, searchTerm, params)
            : this.getArticles(params)
        ),
        shareReplay(1)
      )
      .subscribe({
        next: (response: Comment[] | Article[]) => {
          this.id.getValue()
            ? this.comments.update(response as Comment[])
            : this.articles.update(response as Article[]);
          this.loading.update(false);
        }
      });
  }

  private updatePagination(
    start: number = DEFAULT_PAGINATE_PARAMS.start,
    limit: number = DEFAULT_PAGINATE_PARAMS.limit,
    order: SortDirection = DEFAULT_PAGINATE_PARAMS.order,
    sort: string = DEFAULT_PAGINATE_PARAMS.sort
  ): void {
    this.paginate.update({ start, limit, order, sort });
  }

  /**
   * @returns the filtered Articles by user id
   */

  private getArticles(params: PaginateParams, userId?: number): Observable<Article[]> {
    const queries = concatQueries(params);
    const merged = userId ? queries.concat(`userId=${userId}`) : queries;
    return this.list(this.postUrl + merged) as Observable<Article[]>;
  }

  /**
   * @param id article id
   * @returns get Article by id
   */

  private findById(id: number): Observable<Article> {
    return this.get(this.postUrl + id) as Observable<Article>;
  }

  /**
   * @param id article id
   * @returns get list Comments by Article id
   * 
   */

  private findCommentsByArticle(id: number, searchTerm: string, params: PaginateParams): Observable<Comment[]> {
    const queries = environment.jsonPlaceHolderUrl + `comments?postId=${id}&_start=${params.start}&_limit=${params.limit}`;
    return this.list(queries) as Observable<Comment[]>;
  }

  private get postUrl(): string {
    return environment.jsonPlaceHolderUrl + 'posts/';
  }
}
