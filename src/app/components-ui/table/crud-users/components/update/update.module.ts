import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { UnsavedChangesGuard } from '@lib/guards/unsaved-changes.guard';
import { UsersService } from '@lib/services/users/users.service';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { DetailsModule } from '../details/details.module';
import { UpdateComponent } from './update.component';

@NgModule({
  declarations: [UpdateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: UpdateComponent,
      canDeactivate: [UnsavedChangesGuard],
      data: { title: 'User Details' },
      resolve: { user: UsersService }
    }]),

    DetailsModule,
    BreadcrumbsModule,

    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ]
})
export class UpdateModule { }
