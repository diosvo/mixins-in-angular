import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardItemComponent } from '@home/components/card-item/card-item.component';
import { EFunctions, EUrl } from '@home/models/url.enum';
import { CardItem, SearchService } from '@home/services/search.service';
import { AlertComponent } from '@lib/components/alert/alert.component';
import { CustomButtonComponent } from '@lib/components/custom-button/custom-button.component';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { CustomSelectComponent } from '@lib/components/custom-select/custom-select.component';
import { NoResultsComponent } from '@lib/components/no-results/no-results.component';
import { State } from '@lib/models/server.model';
import isEqual from 'lodash.isequal';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

const groupList = Object.values(EFunctions).sort();
const DEFAULT_FILTER = {
  query: '',
  group: []
};

@Component({
  selector: 'app-list-functions',
  standalone: true,
  templateUrl: './list-functions.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,

    AlertComponent,
    CardItemComponent,
    NoResultsComponent,
    CustomButtonComponent,
    CustomInputComponent,
    CustomSelectComponent,

    MatTooltipModule,
    MatExpansionModule,
    MatProgressBarModule
  ],
  styles: [`
  @import 'layout/breakpoints';
  @include screen('extra-small') {
    .panel-container {
        display: block;
    }
  }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListFunctionsComponent implements OnInit {

  state$: Observable<State<CardItem>>;

  readonly selection = groupList;
  form = this.fb.group({
    query: ['', { nonNullable: true }],
    group: [[], { nonNullable: true }]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly searchService: SearchService,
  ) { }

  ngOnInit(): void {
    const filters$ = this.form.valueChanges.pipe(startWith(this.form.value));
    this.state$ = this.searchService.getData(EUrl.FUNCTION, filters$, this.selection);
  }

  cleanFilters(): void {
    this.form.reset();
  }

  clearAllIconActive(): boolean {
    return !this.primitiveFilters;
  }

  private get primitiveFilters(): boolean {
    return isEqual(this.query.value, DEFAULT_FILTER.query) && isEqual(this.group.value, DEFAULT_FILTER.group);
  }

  get query(): FormControl {
    return this.form.get('query') as FormControl;
  }

  get group(): FormControl {
    return this.form.get('group') as FormControl;
  }
}
