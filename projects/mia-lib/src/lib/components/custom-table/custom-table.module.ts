import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TableColumnDirective } from './custom-table-abstract.directive';
import { CustomTableComponent } from './custom-table.component';

@NgModule({
  declarations: [CustomTableComponent, TableColumnDirective],
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  exports: [CustomTableComponent, TableColumnDirective],
})
export class CustomTableModule { }
