import { Routes } from '@angular/router';

export const ARTICLES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/list-articles/list-articles.component').then(({ ListArticlesComponent }) => ListArticlesComponent),
    title: 'List Articles'
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/view-article-page-state/view-article-page-state.component').then(({ ViewArticlePageStateComponent }) => ViewArticlePageStateComponent),
    title: 'Update Article'
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./components/view-article-page-state/view-article-page-state.component').then(({ ViewArticlePageStateComponent }) => ViewArticlePageStateComponent),
    title: 'Create Article'
  }
];
