import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
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
  declarations: [BasicOperatorsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule.forChild(routes)
  ]
})
export class BasicOperatorsModule { }
