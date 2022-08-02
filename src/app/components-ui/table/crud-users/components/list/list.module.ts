import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AlertModule } from '@lib/components/alert/alert.module';
import { ConfirmDialogModule } from '@lib/components/confirm-dialog/confirm-dialog.module';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { CustomTableModule } from '@lib/components/custom-table/custom-table.module';
import { TrackByKeyDirective } from '@lib/directives/track-by-key.directive';
import { FilterPipe } from 'projects/mia-lib/src/lib/pipes/filter.pipe';
import { ListComponent } from './list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ListComponent,
      title: 'List - Users'
    }]),

    FilterPipe,
    AlertModule,
    CustomTableModule,
    CustomButtonModule,
    ConfirmDialogModule,
    TrackByKeyDirective,
    CustomInputComponent,

    MatProgressBarModule
  ]
})
export class ListModule { }
