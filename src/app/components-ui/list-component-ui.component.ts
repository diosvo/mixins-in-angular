import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
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
export class ListComponentUiComponent implements OnDestroy {

  openState = false;
  showFilterIcon = false;

  searchInput: string;
  selectedGroup: string;

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
    private searchService: SearchService,
    public authService: AuthService,
  ) { }

  /**
  * @description: Search by name
  */
  onFilterKeyChanged($event: string): void {
    if ($event) {
      this.filteredData$ = this.data$
        .pipe(
          map((items: Array<IGroupValue>) =>
            items
              .map(item => ({
                ...item,
                groupDetails: item.groupDetails.filter(
                  details => details.name.toLowerCase().indexOf($event.toLowerCase()) !== -1
                )
              }))
              .filter(item => item.groupDetails.length > 0)
          ),
          tap({
            next: (data: Array<IGroupValue>) => this.emptyMessage = data.length === 0 ? 'No results found.' : null,
            error: () => this.errorMessage = 'An error occurred. Please try again!'
          }),
          takeUntil(this.destroyed$),
        );
    } else {
      this.filteredData$ = this.data$;
      this.emptyMessage = null;
    }
  }

  clearInput(): void {
    this.searchInput = null;
    this.onFilterKeyChanged(this.searchInput);
  }

  /**
  * @description: Filter by Group Name
  */
  onFilterGroupName($event): void {
    this.showFilterIcon = true;
    this.filteredData$ = this.data$.pipe(
      map(group => group.filter(item => item.groupName === $event.value)),
      takeUntil(this.destroyed$)
    );
  }

  clearFilter($event: any): void {
    $event.stopPropagation();
    this.selectedGroup = null;
    this.showFilterIcon = false;
    this.onFilterKeyChanged(this.selectedGroup);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
