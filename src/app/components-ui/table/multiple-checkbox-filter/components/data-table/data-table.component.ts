import { AfterViewInit, Component, OnDestroy, Self, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, merge, Subject, throwError } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Filter } from '../../models/filter.model';
import { GithubIssue } from '../../models/service.model';
import { GithubRepoIssuesService } from '../../service/github-repo-issues.service';
import { SearchFilterComponent } from '../search-filter/search-filter.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [GithubRepoIssuesService]
})

export class DataTableComponent implements OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  dataSource: MatTableDataSource<GithubIssue>;
  filters$ = new BehaviorSubject<Partial<Filter>>({
    query: '',
    state: ''
  });

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(SearchFilterComponent) searchFilter: SearchFilterComponent;

  destroy$ = new Subject<boolean>();
  error$ = new Subject<boolean>();

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
        }),
        catchError((error) => {
          this.error$.next(!error.ok);
          return throwError(() => new Error(error.message));
        })
      )
      .subscribe({
        next: (data: Array<GithubIssue>) => this.dataSource = new MatTableDataSource(data),
      });
  }

  resetPage(): void {
    window.location.reload();
  }

  resetFilters(): void {
    this.searchFilter.resetForm();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}