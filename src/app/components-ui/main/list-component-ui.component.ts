import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { IGroupValue } from '../../home/models/search.model';
import { SearchService } from '../../home/services/search.service';

@Component({
  selector: 'list-component-ui',
  templateUrl: './list-component-ui.component.html',
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
export class ListComponentUiComponent implements OnInit, OnDestroy {

  showFilterIcon = false;

  componentsForm: FormGroup = this.fb.group({
    query: [''],
    group: ['all']
  })

  emptyMessage: string;
  errorMessage: string;

  private destroyed$: Subject<void> = new Subject();
  loading$: BehaviorSubject<boolean> = this.searchService.getUiLoading();

  data$: Observable<Array<IGroupValue>> =
    this.searchService.uiComponentsList$
      .pipe(
        filter(item => !!item),
        map(group => group.sort((prev, next) => prev.groupName < next.groupName ? -1 : 1)),
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
    private snackbar: SnackbarService,
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe(params => {
        if ((params.query && params.group) !== undefined) {
          this.componentsForm.patchValue(params);
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
    this.componentsForm.valueChanges
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
      queryParams: this.componentsForm.value
    });
  }

  selectedChip($event: string): void {
    this.group.setValue($event);
    this.snackbar.info(`Filter by ${$event[0].toUpperCase() + $event.slice(1)} component was applied.`);
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
    return this.componentsForm.get('query') as FormControl;
  }

  get group(): FormControl {
    return this.componentsForm.get('group') as FormControl;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.destroyed$.unsubscribe();
  }
}
