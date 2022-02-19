import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
    ReactiveFormsModule
  ]
})
export class LookupUsersModule { }
