import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'multiple-checkbox-filter',
    loadChildren: () => import('./multiple-checkbox-filter/multiple-checkbox-filter.module').then(({ MultipleCheckboxFilterModule }) => MultipleCheckboxFilterModule)
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TableRoutingModule { }
