import { Routes } from '@angular/router';

export const DATA_COMPOSITION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/main-page/main-page.component')
      .then(({ MainPageComponent }) => MainPageComponent),
    title: 'Data Composition w/ RxJS'
  },
  {
    path: ':id',
    loadComponent: () => import('./components/main-page/main-page.component')
      .then(({ MainPageComponent }) => MainPageComponent),
    title: 'Data Composition w/ RxJS - Product Details'
  }
];

