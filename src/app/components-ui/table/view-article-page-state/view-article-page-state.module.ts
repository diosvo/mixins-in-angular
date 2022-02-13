import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    RouterModule.forChild(routes)
  ]
})
export class ViewArticlePageStateModule { }
