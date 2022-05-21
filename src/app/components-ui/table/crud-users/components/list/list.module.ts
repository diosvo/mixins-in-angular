import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AlertModule } from '@lib/components/alert/alert.module';
import { ConfirmDialogModule } from '@lib/components/confirm-dialog/confirm-dialog.module';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
import { CustomTableModule } from '@lib/components/custom-table/custom-table.module';
import { TrackByKeyDirectiveModule } from '@lib/directives/track-by-key.directive';
import { FilterPipeModule } from 'projects/mia-lib/src/lib/pipes/filter.pipe';
import { ListComponent } from './list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ListComponent,
      data: {
        title: 'List - Users'
      }
    }]),

    AlertModule,
    FilterPipeModule,
    CustomTableModule,
    CustomInputModule,
    CustomButtonModule,
    ConfirmDialogModule,
    TrackByKeyDirectiveModule,

    MatProgressBarModule
  ]
})
export class ListModule { }
