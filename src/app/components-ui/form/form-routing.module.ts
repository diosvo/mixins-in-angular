import { Routes } from '@angular/router';
import { UnsavedChangesGuard } from '@lib/guards/unsaved-changes.guard';
import { ERole } from '@lib/models/role';

export const FORM_ROUTES: Routes = [
  {
    path: 'unsaved-form',
    loadComponent: () => import('./unsaved-form/unsaved-form.component')
      .then(({ UnsavedFormComponent }) => UnsavedFormComponent),
    canDeactivate: [UnsavedChangesGuard],
    data: {
      roles: [ERole.SUBSCRIBER],
    },
    title: 'Unsaved Form Demo',
  },
  {
    path: 'lookup-users',
    loadChildren: () => import('./lookup-users/lookup-users.module').then(({ LookupUsersModule }) => LookupUsersModule)
  }
];
