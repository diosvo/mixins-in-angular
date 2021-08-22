import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'micro-interaction',
    loadChildren: () => import('./micro-interaction/micro-interaction.module').then(m => m.MicroInteractionModule),
  },
  {
    path: 'toggle-mode',
    loadChildren: () => import('./toggle-mode/toggle-mode.module').then(m => m.ToggleModeModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonRoutingModule { }
