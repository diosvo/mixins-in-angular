import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimatedCounterComponent } from './animated-counter.component';

const routes: Routes = [
  {
    path: '',
    component: AnimatedCounterComponent,
    title: 'Animated Counter Card'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimatedCounterRoutingModule { }
