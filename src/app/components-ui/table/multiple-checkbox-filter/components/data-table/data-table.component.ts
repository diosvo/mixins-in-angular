import { AfterViewInit, Component, Self, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { GithubIssue, GithubRepoIssuesService } from '../../service/github-repo-issues.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [GithubRepoIssuesService]
})

export class DataTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  data: Array<GithubIssue>;

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    @Self() readonly service: GithubRepoIssuesService
  ) { }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.getIssues();
  }

  getIssues(): void {
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
        next: (data: Array<GithubIssue>) => this.data = data
      });
  }

  resetPage(): void {}
}
