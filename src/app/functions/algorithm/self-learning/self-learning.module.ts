import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfLearningComponent } from './self-learning.component';

const route: Routes = [
  {
    component: SelfLearningComponent,
    path: '',
    data: {
      title: 'Algorithm - Self Learning'
    }
  }
];

@NgModule({
  declarations: [SelfLearningComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class SelfLearningModule { }
