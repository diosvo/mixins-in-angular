import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AlertComponent } from '@lib/components/alert/alert.component';
import { CustomButtonComponent } from '@lib/components/custom-button/custom-button.component';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { TableColumnDirective } from '@lib/components/custom-table/custom-table-abstract.directive';
import { CustomTableComponent, TableColumn } from '@lib/components/custom-table/custom-table.component';
import { FilterPipe } from '@lib/pipes/filter.pipe';
import { LineBreakPipe } from '@lib/pipes/line-break.pipe';
import { ArticleService } from '../../services/view-article-state.service';

@Component({
  selector: 'app-list-articles',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    AlertComponent,
    CustomButtonComponent,
    CustomTableComponent,
    CustomInputComponent,

    FilterPipe,
    LineBreakPipe,
    TableColumnDirective,

    MatProgressBarModule
  ],
  templateUrl: './list-articles.component.html',
})
export class ListArticlesComponent implements OnInit {

  protected state$ = this.service.articles_state$;

  protected query = new FormControl('');

  columns: TableColumn[] = [
    { key: 'userId', flex: '10%', header: 'user id' },
    { key: 'id', flex: '10%' },
    { key: 'title', flex: '25%' },
    { key: 'body', flex: '45%', truncate: false },
    { key: 'actions', flex: '10%' },
  ];

  constructor(
    private readonly service: ArticleService,
  ) { }

  ngOnInit(): void {
    this.service.loadState();
  }
}
