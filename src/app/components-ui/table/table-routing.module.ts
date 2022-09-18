import { Routes } from '@angular/router';

export const TABLE_ROUTES: Routes = [
  {
    path: 'multiple-checkbox-filter',
    loadComponent: () =>
      import('./multiple-checkbox-filter/components/data-table/data-table.component').then(({ DataTableComponent }) => DataTableComponent),
    title: 'Angular Github Issues'
  },
  {
    path: 'advanced-crud',
    loadComponent: () =>
      import('./advanced-crud/components/advanced-crud/advanced-crud.component').then(({ AdvancedCrudComponent }) => AdvancedCrudComponent),
    title: 'Mat-table: Advanced CRUD',
  },
  {
    path: 'crud-users',
    loadComponent: () =>
      import('./crud-users/components/list/list.component').then(({ ListComponent }) => ListComponent),
    title: 'Users Management',
  },
];
