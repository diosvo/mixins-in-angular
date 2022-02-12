import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewArticlePageStateComponent } from './components/view-article-page-state/view-article-page-state.component';

const routes: Routes = [
  {
    path: '',
    component: ViewArticlePageStateComponent,
    data: {
      title: 'View Article Page State Demo'
    }
  }
];

@NgModule({
  declarations: [ViewArticlePageStateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ViewArticlePageStateModule { }
