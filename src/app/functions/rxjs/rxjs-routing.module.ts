import { Routes } from '@angular/router';

export const RXJS_ROUTES: Routes = [
  {
    path: 'advanced-caching',
    loadComponent: () => import('./advanced-caching/components/advanced-caching/advanced-caching.component')
      .then(({ AdvancedCachingComponent }) => AdvancedCachingComponent),
    title: 'Advanced caching w/ RxJS'
  },
];
