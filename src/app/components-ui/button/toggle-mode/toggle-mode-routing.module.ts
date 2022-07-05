import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToggleModeComponent } from './toggle-mode.component';

const routes: Routes = [
  {
    path: '',
    component: ToggleModeComponent,
    title: 'Button Toggle Mode'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToggleModeRoutingModule { }
