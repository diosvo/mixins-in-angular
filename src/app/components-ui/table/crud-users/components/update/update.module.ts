import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { DetailsModule } from '../details/details.module';
import { UpdateComponent } from './update.component';

@NgModule({
  declarations: [UpdateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: UpdateComponent }]),

    DetailsModule,
    BreadcrumbsModule,

    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class UpdateModule { }
