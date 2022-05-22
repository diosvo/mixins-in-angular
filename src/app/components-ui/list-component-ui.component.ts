import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IBaseValue, IGroupValue } from '@home/models/search.model';
import { EComponentUI } from '@home/models/url.enum';
import { SearchService } from '@home/services/search.service';
import isEqual from 'lodash.isequal';
import { combineLatest, Observable, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

const groupList = Object.values(EComponentUI);

const DEFAULT_FILTER = {
  query: '',
  group: groupList
};

@Component({
  selector: 'list-component-ui',
  templateUrl: './list-component-ui.component.html',
  styles: [`
  @import 'layout/breakpoints';
  @include screen('extra-small') {
    .panel-container {
        display: block;
    }
  }`],
})
export class ListComponentUiComponent implements OnInit {

  errorMessage$ = new Subject<string>();
  filteredData$: Observable<IGroupValue[]>;

  readonly selection = groupList;
  componentsForm: FormGroup = this.fb.group({
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
    const data$ = this.searchService.uiComponentsList$;
    const filters$ = this.componentsForm.valueChanges.pipe(
      startWith(this.componentsForm.value),
      debounceTime(100),
      distinctUntilChanged(),
    );

    this.filteredData$ = combineLatest([data$, filters$]).pipe(
      map(([data, filters]) =>
        data
          .filter((item: IGroupValue) => filters.group.includes(item.groupName))
          .map((item: IGroupValue) => ({
            ...item,
            groupDetails: item.groupDetails.filter((details: IBaseValue) => {
              const searchTerms = details.name + details.description + item.groupName;
              return searchTerms.trim().toLowerCase().includes(filters.query.trim().toLowerCase());
            })
          }))
          .filter(item => item.groupDetails.length > 0)
      ),
      catchError(({ message }) => {
        this.errorMessage$.next(message);
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * @description Support
   */

  cleanFilters(): void {
    this.componentsForm.setValue(DEFAULT_FILTER);
  }

  clearAllIconActive(): boolean {
    return !this.primitiveFilters;
  }

  private get primitiveFilters(): boolean {
    return isEqual(this.query.value, DEFAULT_FILTER.query) && isEqual(this.group.value.length, DEFAULT_FILTER.group.length);
  }

  get query(): FormControl {
    return this.componentsForm.get('query') as FormControl;
  }

  get group(): FormControl {
    return this.componentsForm.get('group') as FormControl;
  }
}
