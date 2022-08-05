import { Routes } from '@angular/router';

export const TABLE_ROUTES: Routes = [
  {
    path: 'multiple-checkbox-filter',
    loadComponent: () =>
      import('./multiple-checkbox-filter/components/data-table/data-table.component').then(({ DataTableComponent }) => DataTableComponent)
  },
  {
    path: 'advanced-crud',
    loadChildren: () => import('./advanced-crud/advanced-crud.module').then(({ AdvancedCrudModule }) => AdvancedCrudModule)
  },
  {
    path: 'crud-users',
    loadChildren: () => import('./crud-users/crud-users.module').then(({ CrudUsersModule }) => CrudUsersModule)
  },
  {
    path: 'view-article-page-state',
    loadChildren: () => import('./view-article-page-state/view-article-page-state.module').then(({ ViewArticlePageStateModule }) => ViewArticlePageStateModule)
  },
];
