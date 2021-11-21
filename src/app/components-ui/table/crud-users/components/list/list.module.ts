import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AlertModule } from '@lib/components/alert/alert.module';
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

    MatButtonModule,
  ]
})
export class ListModule { }
