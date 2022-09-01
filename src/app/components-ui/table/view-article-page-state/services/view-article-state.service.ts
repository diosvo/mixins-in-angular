import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { concatQueries, DEFAULT_PAGINATE_PARAMS, Pagination } from '@lib/models/table';
import { BaseService } from '@lib/services/base/base.service';
import { HandleService } from '@lib/services/base/handle.service';
import { Observable } from 'rxjs';
import { Article, Comment } from '../models/article.model';

@Injectable()
export class ViewArticleStateService extends BaseService<unknown> {

  private cache$: Observable<Article[]>;

  constructor(
    protected readonly http: HttpClient,
    protected readonly handle: HandleService
  ) {
    super(http, handle);
  }

  get articles(): Observable<Article[]> {
    if (!this.cache$) {
      this.cache$ = this.getArticles(DEFAULT_PAGINATE_PARAMS);
    }

    return this.cache$;
  }

  /**
   * @returns the filtered Articles by user id
   */

  private getArticles(params: Pagination, userId?: number): Observable<Article[]> {
    const queries = concatQueries(params);
    const merged = userId ? queries.concat(`userId=${userId}`) : queries;
    return this.list(this.postUrl + merged) as Observable<Article[]>;
  }

  /**
   * @param id article id
   * @returns get Article by id
   */

  private findById(id: number): Observable<Article> {
    return this.get(this.postUrl + id.toString()) as Observable<Article>;
  }

  /**
   * @param id article id
   * @returns get list Comments by Article id
   * 
   */

  private findCommentsByArticle(id: number, searchTerm: string, params: Pagination): Observable<Comment[]> {
    const queries = environment.jsonPlaceHolderUrl + `comments?postId=${id}&_start=${params.offset}&_limit=${params.limit}`;
    return this.list(queries) as Observable<Comment[]>;
  }

  private get postUrl(): string {
    return environment.jsonPlaceHolderUrl + 'posts/';
  }
}
