import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { BaseService } from '@lib/services/base/base.service';
import { AbstractFormService } from '@lib/services/base/form.service';
import { HandleService } from '@lib/services/base/handle.service';
import { StateService } from '@lib/services/base/state.service';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { Article, INITIAL_ARTICLE_STATE } from '../models/article.model';

const DEFAULT_VALUE: Article = {
  id: null,
  userId: null,
  body: '',
  title: '',
};

@Injectable()
export class InternalArticleService extends BaseService<Article> {

  constructor(
    protected readonly http: HttpClient,
    protected readonly handle: HandleService,
  ) {
    super(http, handle);
  }

  all(): Observable<Article[]> {
    return this.list(this.endpoint);
  }

  byId(id: number): Observable<Article> {
    return this.get(this.endpoint + id);
  }

  create(article: Article): Observable<Article> {
    return this.add(this.endpoint, { body: article });
  }

  update(article: Article): Observable<Article> {
    return this.edit(this.endpoint + article.id, { body: article });
  }

  remove(id: number): Observable<unknown> {
    return this.delete(this.endpoint + id);
  }

  protected get endpoint(): string {
    return environment.jsonPlaceHolderUrl + 'posts/';
  }
}

@Injectable()
export class ArticleDetailsService extends AbstractFormService<Article>{

  primary_key = 'id';
  isEdit$ = new BehaviorSubject<boolean>(false);
  primitiveValue$ = new BehaviorSubject<Article>(DEFAULT_VALUE);

  constructor(
    protected override fb: FormBuilder,
    private readonly internal: InternalArticleService,
  ) {
    super(fb);
  }

  all$(): Observable<Article[]> {
    return this.internal.all();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      id: [DEFAULT_VALUE.id],
      userId: [DEFAULT_VALUE.userId, Validators.required],
      body: [DEFAULT_VALUE.body],
      title: [DEFAULT_VALUE.title]
    });
  }

  loadFromApiAndFillForm$(article: Article): Observable<Article> {
    this.isEdit$.next(true);
    return of(article).pipe(this.pipeHandler());
  }

  initializeValue$(): Observable<Article> {
    this.isEdit$.next(false);
    return of(DEFAULT_VALUE).pipe(this.pipeHandler());
  }

  create$(): Observable<Article> {
    delete this.getFormValue()[this.primary_key];
    return this.internal.create(this.getFormValue());
  }

  update$(): Observable<Article> {
    return this.internal.update(this.getFormValue());
  }

  remove$(id: number): Observable<unknown> {
    return this.internal.remove(id);
  }
}

@Injectable()
export class ArticleService extends StateService<Article> {

  readonly articles_state$ = this.select((state) => state);

  constructor(private readonly service: ArticleDetailsService) {
    super(INITIAL_ARTICLE_STATE);
  }

  loadState(): void {
    this.service.all$()
      .pipe(
        map((data: Article[]) => ({ data, loading: false })),
        catchError(({ message }) => of({ data: [], error: message, loading: false })),
        startWith(INITIAL_ARTICLE_STATE)
      )
      .subscribe({
        next: (state) => this.setState(state)
      });
  }
}
