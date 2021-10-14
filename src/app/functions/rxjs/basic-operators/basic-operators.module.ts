import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicOperatorsComponent } from './basic-operators.component';

const routes: Routes = [
  {
    path: '',
    component: BasicOperatorsComponent,
    data: {
      title: 'RxJS - Basic Operators'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BasicOperatorsModule { }
