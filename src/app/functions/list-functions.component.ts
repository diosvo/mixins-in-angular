import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroupValue } from '@home/models/search.model';
import { EFunctions } from '@home/models/url.enum';
import { SearchService } from '@home/services/search.service';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { combineLatest, Observable, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-list-functions',
  templateUrl: './list-functions.component.html',
  styles: [`
  @import 'layout/breakpoints';
  @include screen('extra-small') {
    .panel-container {
        display: block;
    }

    .filter-group {
        width: 100%;
    }
  }`]
})
export class ListFunctionsComponent implements OnInit {

  errorMessage$ = new Subject<string>();

  functionsForm: FormGroup = this.fb.group({
    query: [''],
    group: ['all']
  });
  groupList = Object.values(EFunctions).sort();

  filteredData$: Observable<Array<IGroupValue>>;

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
        if ((params.query && params.group) !== undefined) {
          this.functionsForm.patchValue(params);
        }
        return;
      });
  }

  onFilters(): void {
    const data$ = this.searchService.functionsList$;
    const filters$ = this.functionsForm.valueChanges.pipe(
      startWith(this.functionsForm.value),
      debounceTime(100),
      distinctUntilChanged()
    );

    this.filteredData$ = combineLatest([data$, filters$]).pipe(
      map(([data, filter]) =>
        data
          .filter(item => filter.group !== 'all' ? item.groupName === filter.group : 'all')
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
      takeUntil(this.destroyed$),
      catchError(({ message }) => {
        this.errorMessage$.next(message);
        return throwError(() => new Error(message));
      }),
    );
  }

  updateParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.functionsForm.value
    });
  }

  cleanQuery(): void {
    return this.query.setValue('');
  }

  cleanFilters(): void {
    this.cleanQuery();
    this.group.setValue('all');
  }

  clearAllIconActive(): boolean {
    return !this.primitiveFilters;
  }

  private get primitiveFilters(): boolean {
    return this.query.value === '' && this.group.value === 'all';
  }

  get query(): FormControl {
    return this.functionsForm.get('query') as FormControl;
  }

  get group(): FormControl {
    return this.functionsForm.get('group') as FormControl;
  }
}
