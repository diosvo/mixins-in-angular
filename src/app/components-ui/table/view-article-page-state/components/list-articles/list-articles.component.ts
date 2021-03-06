import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TableColumn } from '@lib/components/custom-table/custom-table.component';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { catchError, Observable, Subject, takeUntil, throwError } from 'rxjs';
import { ViewArticleState } from '../../models/article.model';
import { ViewArticleStateService } from '../../services/view-article-state.service';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  providers: [ViewArticleStateService]
})
export class ListArticlesComponent implements OnInit {

  state$: Observable<ViewArticleState>;
  errorMessage$ = new Subject<string>();

  query = new FormControl('');

  columns: Array<TableColumn> = [
    { key: 'userId', flex: '10%', header: 'user id' },
    { key: 'id', flex: '10%' },
    { key: 'title', flex: '25%' },
    { key: 'body', flex: '45%', truncate: false },
    { key: 'actions', flex: '10%' },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly destroyed$: DestroyService,
    private readonly service: ViewArticleStateService,
  ) { }

  ngOnInit(): void {
    this.getState();
    this.updateParams();
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
        next: (params: Record<string, string>) => this.service.updateStateFromQueryParams(params)
      });
  }
}
