import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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

    CustomTableModule,
  ]
})
export class ListModule { }
