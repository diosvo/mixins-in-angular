import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AlertComponent } from '@lib/components/alert/alert.component';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { TableColumnDirective } from '@lib/components/custom-table/custom-table-abstract.directive';
import { CustomTableComponent, TableColumn } from '@lib/components/custom-table/custom-table.component';
import { FilterPipe } from '@lib/pipes/filter.pipe';
import { LineBreakPipe } from '@lib/pipes/line-break.pipe';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Article } from '../../models/article.model';
import { ViewArticleStateService } from '../../services/view-article-state.service';

@Component({
  selector: 'app-list-articles',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    AlertComponent,
    CustomButtonModule,
    CustomTableComponent,
    CustomInputComponent,

    FilterPipe,
    LineBreakPipe,
    TableColumnDirective,

    MatProgressBarModule
  ],
  templateUrl: './list-articles.component.html',
  providers: [ViewArticleStateService]
})
export class ListArticlesComponent implements OnInit {

  protected state$: Observable<Article[]>;
  protected errorMessage$ = new Subject<string>();

  protected query = new FormControl('');

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
  }

  private getState(): void {
    this.state$ = this.service.articles.pipe(
      catchError(({ message }) => {
        this.errorMessage$.next(message);
        return throwError(() => new Error(message));
      })
    );
  }
}
