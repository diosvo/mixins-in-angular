import { Routes } from '@angular/router';

export const CARD_ROUTES: Routes = [
  {
    path: 'animated-counter',
    loadComponent: () => import('./animated-counter/animated-counter.component')
      .then(({ AnimatedCounterComponent }) => AnimatedCounterComponent),
    title: 'Animated Counter Card'
  },
];
