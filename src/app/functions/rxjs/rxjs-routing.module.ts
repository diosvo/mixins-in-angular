import { Routes } from '@angular/router';

export const RXJS_ROUTES: Routes = [
  {
    path: 'data-composition-ng-conf',
    loadChildren: () => import('./data-composition-ng-conf/data-composition-ng-conf-routing.module')
      .then(({ DATA_COMPOSITION_ROUTES }) => DATA_COMPOSITION_ROUTES)
  },
  {
    path: 'advanced-caching',
    loadComponent: () => import('./advanced-caching/components/advanced-caching/advanced-caching.component')
      .then(({ AdvancedCachingComponent }) => AdvancedCachingComponent),
    title: 'Advanced caching with RxJS'
  }
];
