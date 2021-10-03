import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DataTableComponent } from './components/data-table/data-table.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { MultipleCheckboxSearchRoutingModule } from './multiple-checkbox-filter-routing.module';

@NgModule({
  declarations: [
    SearchFilterComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MultipleCheckboxSearchRoutingModule
  ]
})
export class MultipleCheckboxFilterModule { }
