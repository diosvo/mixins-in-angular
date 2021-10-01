import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
    MultipleCheckboxSearchRoutingModule
  ]
})
export class MultipleCheckboxFilterModule { }
