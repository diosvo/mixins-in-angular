import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from '@lib/components/alert/alert.component';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { TableColumnDirective } from '@lib/components/custom-table/custom-table-abstract.directive';
import { CustomTableComponent } from '@lib/components/custom-table/custom-table.component';
import { LineBreakPipe } from '@lib/pipes/line-break.pipe';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Article } from '../../models/article.model';
import { ViewArticleStateService } from '../../services/view-article-state.service';

@Component({
  selector: 'app-view-article-page-state',
  standalone: true,
  imports: [
    CommonModule,

    AlertComponent,
    LineBreakPipe,
    CustomButtonModule,
    CustomTableComponent,
    CustomInputComponent,
    TableColumnDirective,

    MatProgressBarModule
  ],
  templateUrl: './view-article-page-state.component.html',
  providers: [ViewArticleStateService]
})
export class ViewArticlePageStateComponent implements OnInit {

  state$: Observable<Article[]>;
  errorMessage$ = new Subject<string>();

  constructor(
    private readonly route: ActivatedRoute,
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
