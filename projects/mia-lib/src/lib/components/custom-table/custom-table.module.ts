import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ColumnComponent, DataTableCellDirective } from './components/column/column.component';
import { CustomTableComponent } from './components/table/custom-table.component';

@NgModule({
  declarations: [
    ColumnComponent,
    CustomTableComponent,
    DataTableCellDirective,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ColumnComponent,
    CustomTableComponent,
  ],
})
export class CustomTableModule { }
