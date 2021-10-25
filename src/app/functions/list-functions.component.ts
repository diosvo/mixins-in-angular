import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroupValue } from '@home/models/search.model';
import { EFunctions } from '@home/models/url.enum';
import { SearchService } from '@home/services/search.service';
import { combineLatest, Observable, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-list-functions',
  templateUrl: './list-functions.component.html',
  styles: [`
    @media screen and (max-width: 600px) {
      .panel-container {
        display: block;
      }

      .filter-group {
        width: 100%;
      }
    }`]
})
export class ListFunctionsComponent implements OnInit, OnDestroy {

  showFilterIcon = false;
  errorMessage$ = new Subject<string>();

  functionsForm: FormGroup = this.fb.group({
    query: [''],
    group: ['all']
  })
  groupList = Object.values(EFunctions).sort((prev, next) => prev < next ? -1 : 1)

  filteredData$: Observable<Array<IGroupValue>>;
  private destroyed$: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private searchService: SearchService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe(params => {
        if ((params.query && params.group) !== undefined) {
          this.functionsForm.patchValue(params);
        }
        return;
      });
    this.onFilters();
  }

  /**
   * @description Search
   */

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
      catchError(({ message }) =>
        throwError(() => {
          this.errorMessage$.next(message);
          return new Error(message);
        })
      ),
    );
  }

  async updateParams(): Promise<void> {
    await this.router.navigate([], {
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
    return this.showFilterIcon = !this.primitiveFilters;
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

  ngOnDestroy(): void {
    this.destroyed$.complete();
    this.destroyed$.unsubscribe();
  }
}
