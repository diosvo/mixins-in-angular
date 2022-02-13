import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(
    private readonly service: ViewArticleStateService
  ) { }

  ngOnInit(): void {
    this.getState();
  }

  private getState(): void {
    this.state$ = this.service.state$;
  }
}
