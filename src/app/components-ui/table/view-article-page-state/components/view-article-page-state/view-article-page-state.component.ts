import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, filter, map, Observable, Subject, takeUntil, throwError } from 'rxjs';
import { ViewArticleState } from '../../models/article.model';
import { ViewArticleStateService } from '../../services/view-article-state.service';

@Component({
  selector: 'app-view-article-page-state',
  templateUrl: './view-article-page-state.component.html',
  styleUrls: ['./view-article-page-state.component.scss'],
  providers: [ViewArticleStateService]
})
export class ViewArticlePageStateComponent implements OnInit, OnDestroy {

  state$: Observable<ViewArticleState>;
  errorMessage$ = new Subject<string>();

  searchInput: FormControl = this.service.controlSearchTerm();
  private destroyed$ = new Subject<boolean>();

  constructor(
    private readonly route: ActivatedRoute,
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
        next: (params: any) => this.service.updateStateFromQueryParams(params)
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
