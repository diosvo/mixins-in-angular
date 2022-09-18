import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { CustomTableComponent } from '@lib/components/custom-table/custom-table.component';
import { TrackByKeyDirective } from '@lib/directives/track-by-key.directive';
import { UsersService } from '@lib/services/users/users.service';
import { FilterPipe } from 'projects/mia-lib/src/lib/pipes/filter.pipe';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SelectOptionComponent } from './components/select-option/select-option.component';
import { AutocompleteContentDirective } from './utils/autocomplete-content.directive';
import { AutocompleteDirective } from './utils/autocomplete.directive';

@NgModule({
  declarations: [
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

    FilterPipe,
    CustomTableComponent,
    TrackByKeyDirective,

    MatProgressSpinnerModule
  ],
  providers: [UsersService]
})
export class LookupUsersModule { }
