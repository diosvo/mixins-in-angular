import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EFunctions } from '@home/models/url.enum';
import { CardItem, SearchService } from '@home/services/search.service';
import { FilterObjectPipe } from '@lib/pipes/filter.pipe';
import isEmpty from 'lodash.isempty';
import isEqual from 'lodash.isequal';
import { combineLatest, EMPTY, Observable, Subject } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

const groupList = Object.values(EFunctions).sort();
const DEFAULT_FILTER = {
  query: '',
  group: []
};

@Component({
  selector: 'app-list-functions',
  templateUrl: './list-functions.component.html',
  styles: [`
  @import 'layout/breakpoints';
  @include screen('extra-small') {
    .panel-container {
        display: block;
    }
  }`],
})
export class ListFunctionsComponent implements OnInit {

  errorMessage$ = new Subject<string>();
  filteredData$: Observable<CardItem[]>;

  readonly selection = groupList;
  functionsForm: FormGroup = this.fb.group({
    query: [DEFAULT_FILTER.query],
    group: [DEFAULT_FILTER.group]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.onFilters();
  }

  /**
   * @description Search
   */

  private onFilters(): void {
    const data$ = this.searchService.functionsList$;
    const filters$ = this.functionsForm.valueChanges.pipe(
      startWith(this.functionsForm.value),
    );

    this.filteredData$ = combineLatest([data$, filters$]).pipe(
      map(([data, filters]) =>
        data
          .filter((item: CardItem) => (isEmpty(this.group.value) ? groupList : filters.group).includes(item.group_id))
          .filter((item: CardItem) => new FilterObjectPipe().transform(item, filters.query))
      ),
      catchError(({ message }) => {
        this.errorMessage$.next(message);
        return EMPTY;
      })
    );
  }

  cleanFilters(): void {
    this.functionsForm.setValue(DEFAULT_FILTER);
  }

  clearAllIconActive(): boolean {
    return !this.primitiveFilters;
  }

  private get primitiveFilters(): boolean {
    return isEqual(this.query.value, DEFAULT_FILTER.query) && isEqual(this.group.value, DEFAULT_FILTER.group);
  }

  get query(): FormControl {
    return this.functionsForm.get('query') as FormControl;
  }

  get group(): FormControl {
    return this.functionsForm.get('group') as FormControl;
  }
}
