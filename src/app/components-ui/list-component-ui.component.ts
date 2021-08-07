import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { IGroupValue } from '../home/models/search.model';
import { SearchService } from '../home/services/search.service';

@Component({
  selector: 'list-component-ui',
  templateUrl: './list-component-ui.component.html',
  styleUrls: ['./list-component-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponentUiComponent implements OnInit, OnDestroy {

  openState = false;
  showFilterIcon = false;

  componentsForm: FormGroup = this.fb.group({
    query: [''],
    group: ['']
  })

  emptyMessage: string;
  errorMessage: string;

  private destroyed$: Subject<void> = new Subject();
  loading$: Observable<boolean> = this.searchService.getLoading();

  data$: Observable<Array<IGroupValue>> =
    this.searchService.uiComponentsList$
      .pipe(
        filter(item => !!item),
        tap({
          error: () => this.errorMessage = 'An error occurred. Please try again!'
        }),
        takeUntil(this.destroyed$)
      );

  filteredData$: Observable<Array<IGroupValue>> = this.data$;

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.onFormChanged();
  }

  /**
  * @description: Search
  */

  onFormChanged(): void {
    this.componentsForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(response => {
        if (response.query !== '' || response.group !== '') {
          this.filteredData$ = this.data$
            .pipe(
              map((group: Array<IGroupValue>) => group
                .map(item => ({
                  ...item,
                  groupDetails: item.groupDetails.filter(
                    details => details.name.toLowerCase().indexOf(response.query.toLowerCase()) !== -1
                  )
                }))
                .filter(item => item.groupName === response.group)
                .filter(item => item.groupDetails.length > 0)
              ),
              tap({
                next: (data: Array<IGroupValue>) => this.emptyMessage = data.length === 0 ? 'No results found.' : null,
                error: () => this.errorMessage = 'An error occurred. Please try again!'
              })
            );

          this.showFilterIcon = true;
        } else {
          this.filteredData$ = this.data$;
          this.emptyMessage = null;
        }
      });
  }

  cleanQuery(): void {
    return this.query.setValue('');
  }

  cleanGroup($event: Event): void {
    $event.stopPropagation();
    return this.group.setValue('');
  }

  cleanFilters($event: Event): void {
    this.cleanQuery();
    this.cleanGroup($event);
    this.showFilterIcon = false;
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
  }
}
