import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TrackByKeyDirective } from '@lib/directives/track-by-key.directive';
import { FilterPipe } from '@lib/pipes/filter.pipe';
import { UsersService } from '@lib/services/users/users.service';
import { Subject } from 'rxjs';
import { AutocompleteContentDirective } from '../../utils/autocomplete-content.directive';
import { AutocompleteDirective } from '../../utils/autocomplete.directive';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { SelectOptionComponent } from '../select-option/select-option.component';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    AutocompleteComponent,
    SelectOptionComponent,
    AutocompleteDirective,
    AutocompleteContentDirective,

    FilterPipe,
    TrackByKeyDirective,
    MatProgressSpinnerModule,
  ],
  styles: [`
    :host {
      display: flex;
      justify-content: center;
    }
  `],
  providers: [UsersService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent implements OnInit {

  readonly state$ = this.service.users_state$;
  selected$ = new Subject<string>();
  control = new FormControl('', Validators.required);

  constructor(
    private readonly service: UsersService
  ) { }

  ngOnInit(): void {
    this.service.loadState();
  }

  stateChanges(name: string): void {
    this.selected$.next(name);
  }
}