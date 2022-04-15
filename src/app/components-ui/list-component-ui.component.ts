import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroupValue } from '@home/models/search.model';
import { EComponentUI } from '@home/models/url.enum';
import { SearchService } from '@home/services/search.service';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import isEqual from 'lodash.isequal';
import isUndefined from 'lodash/isundefined';
import { combineLatest, Observable, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, takeUntil, tap } from 'rxjs/operators';

const DEFAULT_FILTER = {
  query: '',
  group: 'all'
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
  filteredData$: Observable<Array<IGroupValue>>;

  componentsForm: FormGroup = this.fb.group({
    query: [DEFAULT_FILTER.query],
    group: [DEFAULT_FILTER.group]
  });
  groupList = Object.values(EComponentUI);

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly destroyed$: DestroyService,
    private readonly searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.watchForQueryParams();
    this.onFilters();
  }

  /**
   * @description Search
   */

  private watchForQueryParams(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe(params => {
        if (isUndefined(params.query && params.group)) {
          this.componentsForm.patchValue(params);
        }
        return;
      });
  }

  private onFilters(): void {
    const data$ = this.searchService.uiComponentsList$;
    const filters$ = this.componentsForm.valueChanges.pipe(
      startWith(this.componentsForm.value),
      debounceTime(100),
      distinctUntilChanged()
    );

    this.filteredData$ = combineLatest([data$, filters$]).pipe(
      map(([data, filter]) =>
        data
          .filter(item => !isEqual(filter.group, DEFAULT_FILTER.group) ? isEqual(item.groupName, filter.group) : DEFAULT_FILTER.group)
          .map(item => ({
            ...item,
            groupDetails: item.groupDetails.filter(details => {
              const searchTerm = details.name + details.description + item.groupName;
              return searchTerm.toLowerCase().indexOf(filter.query.toLowerCase()) !== -1;
            })
          }))
          .filter(item => item.groupDetails.length > 0)
      ),
      tap(() => this.updateParams()),
      catchError(({ message }) => {
        this.errorMessage$.next(message);
        return throwError(() => new Error(message));
      }),
    );
  }

  updateParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.componentsForm.value
    });
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
    return isEqual(this.query.value, DEFAULT_FILTER.query) && isEqual(this.group.value, DEFAULT_FILTER.group);
  }

  get query(): FormControl {
    return this.componentsForm.get('query') as FormControl;
  }

  get group(): FormControl {
    return this.componentsForm.get('group') as FormControl;
  }
}
