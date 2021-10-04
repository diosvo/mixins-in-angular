import { AfterViewInit, Component, OnDestroy, Self, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Filter } from '../../models/filter.model';
import { GithubIssue } from '../../models/service.model';
import { GithubRepoIssuesService } from '../../service/github-repo-issues.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [GithubRepoIssuesService]
})

export class DataTableComponent implements OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  dataSource: MatTableDataSource<GithubIssue>;
  filters$ = new BehaviorSubject<Filter>({
    query: '',
    state: ['']
  });

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  destroy$ = new Subject<boolean>();

  constructor(
    @Self() readonly service: GithubRepoIssuesService
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.getIssues();
  }

  private getIssues(): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service!.getRepoIssues(this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          this.isLoadingResults = false;

          if (data === null) {
            return [];
          }

          this.resultsLength = data.total_count;
          return data.items;
        })
      )
      .subscribe({
        next: (data: Array<GithubIssue>) => this.dataSource = new MatTableDataSource(data)
      });
  }

  resetPage(): void {
    window.location.reload();
  }

  onFormChanged($event: Filter): void {
    this.filters$.next($event);
    this.onFilter();
  }

  onFilter(): void {
    this.dataSource.filterPredicate = ((data: GithubIssue, filterForm: string) => {
      const filterValues = JSON.parse(filterForm);
      let conditions = true;

      for (let key in filterValues) {
        if (key === 'query') {
          const searchTerm = data.number + data.title;
          conditions = conditions && searchTerm.toLowerCase().indexOf(filterValues['query'].trim().toLowerCase()) !== -1;
        }
        else if (filterValues[key].length) {
          conditions = conditions && filterValues[key].includes(data[key].trim().toLowerCase());
        }
      }

      return conditions;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
