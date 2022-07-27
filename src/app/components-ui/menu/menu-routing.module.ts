import { Routes } from '@angular/router';

export const MENU_ROUTES: Routes = [
  {
    path: 'navbar',
    loadComponent: () => import('./navbar/navbar.component')
      .then(({ NavbarComponent }) => NavbarComponent),
    title: 'Navbar Interaction'
  },
];
