import { Component, OnInit } from '@angular/core';
import { TableColumn } from '@lib/components/custom-table/custom-table.component';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { ViewArticleState } from '../../models/article.model';
import { ViewArticleStateService } from '../../services/view-article-state.service';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss'],
  providers: [ViewArticleStateService]
})
export class ListArticlesComponent implements OnInit {

  state$: Observable<ViewArticleState>;
  errorMessage$ = new Subject<string>();

  columns: Array<TableColumn> = [
    { key: 'userId', flex: '10%', header: 'user id' },
    { key: 'id', flex: '10%' },
    { key: 'title', flex: '25%' },
    { key: 'body', flex: '45%' },
    { key: 'actions', flex: '10%' },
  ];

  constructor(
    private readonly service: ViewArticleStateService
  ) { }

  ngOnInit(): void {
    this.getState();
  }

  private getState(): void {
    this.state$ = this.service.state$.pipe(
      catchError(({ message }) => {
        this.errorMessage$.next(message);
        return throwError(() => new Error(message));
      })
    );
  }
}
