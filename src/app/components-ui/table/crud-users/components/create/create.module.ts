import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { DetailsModule } from '../details/details.module';
import { CreateComponent } from './create.component';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: CreateComponent,
      data: {
        title: 'Create - User'
      }
    }]),

    DetailsModule,
    BreadcrumbsModule,

    MatButtonModule,
    MatProgressBarModule
  ]
})
export class CreateModule { }
