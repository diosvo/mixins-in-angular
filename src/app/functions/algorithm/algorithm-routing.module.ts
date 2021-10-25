import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'self-learning',
    loadChildren: () => import('./self-learning/self-learning.module').then(m => m.SelfLearningModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlgorithmRoutingModule { }
