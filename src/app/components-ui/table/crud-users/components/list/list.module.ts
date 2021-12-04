import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AlertModule } from '@lib/components/alert/alert.module';
import { ConfirmDialogModule } from '@lib/components/confirm-dialog/confirm-dialog.module';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
import { CustomTableModule } from '@lib/components/custom-table/custom-table.module';
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
    CustomTableModule,
    CustomButtonModule,
    ConfirmDialogModule,

    MatProgressBarModule
  ]
})
export class ListModule { }
