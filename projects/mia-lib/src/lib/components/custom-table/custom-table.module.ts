import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableColumnDirective } from './custom-table-abstract.directive';
import { CustomTableComponent } from './custom-table.component';

@NgModule({
  declarations: [CustomTableComponent, TableColumnDirective],
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatPaginatorModule,
  ],
  exports: [CustomTableComponent, TableColumnDirective],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'standard' }
    },
  ]
})
export class CustomTableModule { }
