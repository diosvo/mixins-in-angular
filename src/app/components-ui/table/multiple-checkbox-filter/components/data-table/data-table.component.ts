import { Component, OnInit, Self, ViewChild } from '@angular/core';
import { TableColumn } from '@lib/components/custom-table/custom-table.component';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

export class DataTableComponent implements OnInit {
  issues$: Observable<Array<GithubIssue>>;

  columns: Array<TableColumn> = [
    { key: 'created_at', header: 'Created At' },
    { key: 'state' },
    { key: 'number' },
    { key: 'title' },
  ];
  filters$ = new BehaviorSubject<Partial<Filter>>({
    query: '',
    state: ''
  });

  isLoadingResults = true;

  @ViewChild(SearchFilterComponent) searchFilter: SearchFilterComponent;
  errorMessage$ = new Subject<boolean>();

  constructor(
    @Self() readonly service: GithubRepoIssuesService
  ) { }

  ngOnInit(): void {
    this.getIssues();
  }

  private getIssues(): void {
    // should show all of items: about 20000
    this.issues$ = this.service.getRepoIssues().pipe(
      catchError(({ message }) => {
        this.errorMessage$.next(message);
        return throwError(() => new Error(message));
      })
    );
  }

  resetPage(): void {
    window.location.reload();
  }

  resetFilters(): void {
    this.searchFilter.resetForm();
  }
}
