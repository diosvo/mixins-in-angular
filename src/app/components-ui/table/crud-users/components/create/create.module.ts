import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { DetailsModule } from '../details/details.module';
import { CreateComponent } from './create.component';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CreateComponent }]),

    DetailsModule,
    BreadcrumbsModule,

    MatButtonModule,
  ]
})
export class CreateModule { }
