import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { IGroupValue } from '../home/models/search.model';
import { SearchService } from '../home/services/search.service';

@Component({
  selector: 'app-list-functions',
  templateUrl: './list-functions.component.html',
  styles: [`
  @media screen and (max-width: 600px) {
    .panel-container {
      display: block;
        
      .filter-group {
        width: 100%;
      }
    }
  }`]
})
export class ListFunctionsComponent implements OnInit, OnDestroy {

  openState = false;
  showFilterIcon = false;

  functionsForm: FormGroup = this.fb.group({
    query: [''],
    group: ['all']
  })

  emptyMessage: string;
  errorMessage: string;

  private destroyed$: Subject<void> = new Subject();
  loading$: Observable<boolean> = this.searchService.getLoading();

  data$: Observable<Array<IGroupValue>> =
    this.searchService.functionsList$
      .pipe(
        filter(item => !!item),
        tap({
          error: () => this.errorMessage = 'An error occurred. Please try again!'
        }),
        takeUntil(this.destroyed$)
      );

  filteredData$: Observable<Array<IGroupValue>>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe(params => {
        if (this.primitiveFilters) {
          this.functionsForm.patchValue(params);
        }
        return;
      });
    this.onFormChanges();
    this.onFilters();
  }

  /**
  * @description: Search
  */

  onFormChanges(): void {
    this.functionsForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => {
        this.onFilters();
        this.updateParams();
      });
  }

  onFilters(): void {
    this.filteredData$ = this.data$
      .pipe(
        map((group: Array<IGroupValue>) => group
          .filter(item => this.group.value !== 'all' ? item.groupName === this.group.value : 'all')
          .map(item => ({
            ...item,
            groupDetails: item.groupDetails.filter(
              details => details.name.toLowerCase().indexOf(this.query.value.toLowerCase()) !== -1
            )
          }))
          .filter(item => item.groupDetails.length > 0)
        ),
        tap({
          next: (data: Array<IGroupValue>) => setTimeout(() => this.emptyMessage = data.length === 0 ? 'No item were found to match your search/filters' : null),
          error: () => this.errorMessage = 'An error occurred. Please try again!'
        }),
        takeUntil(this.destroyed$)
      );
  }

  updateParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.functionsForm.value
      },
      queryParamsHandling: 'merge'
    });
  }

  cleanQuery(): void {
    return this.query.setValue('');
  }

  cleanGroup($event: Event): void {
    $event.stopPropagation();
    return this.group.setValue('all');
  }

  cleanFilters($event: Event): void {
    this.cleanQuery();
    this.cleanGroup($event);
  }

  clearAllIconActive(): boolean {
    return this.showFilterIcon = this.primitiveFilters ? false : true;
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
    this.destroyed$.next();
    this.destroyed$.complete();
    this.destroyed$.unsubscribe();
  }
}
