import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule } from '@lib/components/alert/alert.module';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
import { CustomTableModule } from '@lib/components/custom-table/custom-table.module';
import { ListArticlesComponent } from './components/list-articles/list-articles.component';
import { ViewArticlePageStateComponent } from './components/view-article-page-state/view-article-page-state.component';

const routes: Routes = [
  {
    path: '',
    component: ListArticlesComponent,
    data: {
      title: 'List Articles'
    }
  },
  {
    path: ':id',
    component: ViewArticlePageStateComponent,
    data: {
      title: 'View Article Page State'
    }
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

    AlertModule,
    CustomTableModule,
    CustomButtonModule,

    MatProgressBarModule
  ]
})
export class ViewArticlePageStateModule { }
