import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { ViewArticleState } from '../../models/article.model';
import { ViewArticleStateService } from '../../services/view-article-state.service';

@Component({
  selector: 'app-view-article-page-state',
  templateUrl: './view-article-page-state.component.html',
  providers: [ViewArticleStateService]
})
export class ViewArticlePageStateComponent implements OnInit {

  state$: Observable<ViewArticleState>;
  errorMessage$ = new Subject<string>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: ViewArticleStateService,
  ) { }

  ngOnInit(): void {
    this.setArticle();
    this.getState();
  }

  private setArticle(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.updateArticleId(Number(id));
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
