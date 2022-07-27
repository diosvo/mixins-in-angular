import { Routes } from '@angular/router';

export const BUTTON_ROUTES: Routes = [
  {
    path: 'micro-interaction',
    loadComponent: () => import('./micro-interaction/micro-interaction.component').then(({ MicroInteractionComponent }) => MicroInteractionComponent),
    title: 'Micro Interaction'
  },
  {
    path: 'toggle-mode',
    loadComponent: () => import('./toggle-mode/toggle-mode.component').then(({ ToggleModeComponent }) => ToggleModeComponent),
    title: 'Button Toggle Mode'
  },
];

