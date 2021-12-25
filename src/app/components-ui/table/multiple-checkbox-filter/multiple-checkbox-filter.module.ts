import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AlertModule } from '@lib/components/alert/alert.module';
import { CustomTableModule } from '@lib/components/custom-table/custom-table.module';
import { DataTableComponent } from './components/data-table/data-table.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { MultipleCheckboxSearchRoutingModule } from './multiple-checkbox-filter-routing.module';

@NgModule({
  declarations: [
    DataTableComponent,
    SearchFilterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MultipleCheckboxSearchRoutingModule,

    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,

    AlertModule,
    CustomTableModule
  ]
})
export class MultipleCheckboxFilterModule { }
