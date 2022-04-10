import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { catchError, filter, map, Observable, Subject, takeUntil, throwError } from 'rxjs';
import { PaginateParams, ViewArticleState } from '../../models/article.model';
import { ViewArticleStateService } from '../../services/view-article-state.service';

interface Params extends PaginateParams {
  query: string;
}

@Component({
  selector: 'app-view-article-page-state',
  templateUrl: './view-article-page-state.component.html',
  styleUrls: ['./view-article-page-state.component.scss'],
  providers: [ViewArticleStateService]
})
export class ViewArticlePageStateComponent implements OnInit {

  state$: Observable<ViewArticleState>;
  errorMessage$ = new Subject<string>();

  searchInput: FormControl = this.service.controlSearchTerm();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly destroyed$: DestroyService,
    private readonly service: ViewArticleStateService,
  ) { }

  ngOnInit(): void {
    this.setArticle();
    this.updateParams();
    this.getState();
  }

  private setArticle(): void {
    this.route.paramMap
      .pipe(
        filter((params) => params.has('id')),
        map((params) => params.get('id')),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (id: string) => this.service.updateArticleId(Number(id))
      });
  }

  private getState(): void {
    this.state$ = this.service.state$.pipe(
      catchError(({ message }) => {
        this.errorMessage$.next(message);
        return throwError(() => new Error(message));
      })
    );
  }

  private updateParams(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (params: Params) => this.service.updateStateFromQueryParams(params)
      });
  }
}
