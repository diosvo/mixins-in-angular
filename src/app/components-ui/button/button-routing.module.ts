import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'micro-interaction',
    loadChildren: () => import('./micro-interaction/micro-interaction.module').then(m => m.MicroInteractionModule),
  },
  {
    path: 'toggle-mode',
    loadChildren: () => import('./toggle-mode/toggle-mode.module').then(m => m.ToggleModeModule),
  },
  {
    path: 'expandable-floating-menu',
    loadChildren: () => import('./expandable-floating-menu/expandable-floating-menu.module').then(m => m.ExpandableFloatingMenuModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonRoutingModule { }
