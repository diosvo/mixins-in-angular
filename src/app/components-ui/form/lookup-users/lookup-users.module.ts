import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { CustomTableModule } from '@lib/components/custom-table/custom-table.module';
import { FilterPipeModule } from 'projects/mia-lib/src/lib/pipes/filter.pipe';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SelectOptionComponent } from './components/select-option/select-option.component';
import { AutocompleteContentDirective } from './utils/autocomplete-content.directive';
import { AutocompleteDirective } from './utils/autocomplete.directive';

@NgModule({
  declarations: [
    DataTableComponent,
    SearchPageComponent,
    SelectOptionComponent,
    AutocompleteComponent,

    AutocompleteDirective,
    AutocompleteContentDirective,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SearchPageComponent,
        data: {
          title: 'Lookup Users'
        }
      }
    ]),

    FilterPipeModule,
    CustomTableModule,
    MatProgressSpinnerModule
  ]
})
export class LookupUsersModule { }
