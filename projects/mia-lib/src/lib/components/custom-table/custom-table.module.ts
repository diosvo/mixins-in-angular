import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
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
    MatPaginatorModule
  ],
  exports: [
    ColumnComponent,
    CustomTableComponent,
  ],
})
export class CustomTableModule { }
