import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '@lib/components/alert/alert.module';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
import { CustomSelectModule } from '@lib/components/custom-select/custom-select.module';
import { CustomTableModule } from '@lib/components/custom-table/custom-table.module';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MultipleCheckboxSearchRoutingModule } from './multiple-checkbox-filter-routing.module';

@NgModule({
  declarations: [DataTableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MultipleCheckboxSearchRoutingModule,

    AlertModule,
    CustomTableModule,
    CustomInputModule,
    CustomSelectModule
  ]
})
export class MultipleCheckboxFilterModule { }
