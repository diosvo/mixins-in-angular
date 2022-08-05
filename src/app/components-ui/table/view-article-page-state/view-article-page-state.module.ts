import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule, Routes } from '@angular/router';
import { AlertComponent } from '@lib/components/alert/alert.component';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { CustomTableComponent } from '@lib/components/custom-table/custom-table.component';
import { FilterPipe } from '@lib/pipes/filter.pipe';
import { LineBreakPipe } from 'projects/mia-lib/src/lib/pipes/line-break.pipe';
import { ListArticlesComponent } from './components/list-articles/list-articles.component';
import { ViewArticlePageStateComponent } from './components/view-article-page-state/view-article-page-state.component';

const routes: Routes = [
  {
    path: '',
    component: ListArticlesComponent,
    title: 'List Articles'
  },
  {
    path: ':id',
    component: ViewArticlePageStateComponent,
    title: 'View Article Page State'
  }
];

@NgModule({
  declarations: [
    ListArticlesComponent,
    ViewArticlePageStateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    FilterPipe,
    AlertComponent,
    LineBreakPipe,
    CustomButtonModule,
    CustomTableComponent,
    CustomInputComponent,

    MatProgressBarModule
  ]
})
export class ViewArticlePageStateModule { }
