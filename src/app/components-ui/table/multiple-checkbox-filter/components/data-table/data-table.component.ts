import { Component, OnInit, Self, ViewChild } from '@angular/core';
import { TableColumn } from '@lib/components/custom-table/custom-table.component';
import { BehaviorSubject, combineLatest, Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Filter } from '../../models/filter.model';
import { GithubIssue } from '../../models/service.model';
import { GithubRepoIssuesService } from '../../service/github-repo-issues.service';
import { SearchFilterComponent } from '../search-filter/search-filter.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styles: ['@use \'chip\';'],
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
  private _filters$ = new BehaviorSubject<Partial<Filter>>({
    query: '',
    state: ''
  });
  readonly filters$ = this._filters$.asObservable();

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

    this.issues$ = combineLatest([this.service.getRepoIssues(), this.filters$]).pipe(
      map(([data, params]) =>
        data.filter((item: GithubIssue) => {
          let conditions = true;
          const filterValues = JSON.parse(JSON.stringify(params));

          for (const key in filterValues) {
            if (key === 'query') {
              const searchTerm = item.number + item.title;
              conditions = conditions && searchTerm.toLowerCase().indexOf(filterValues['query'].trim().toLowerCase()) !== -1;
            }
            else if (filterValues[key] !== null && filterValues[key].length) {
              conditions = conditions && filterValues[key].includes(data[key].trim().toLowerCase());
            }
          }

          return conditions;
        })
      ),
      catchError(({ message }) => {
        this.errorMessage$.next(message);
        return throwError(() => new Error(message));
      })
    );
  }

  filteredIssues($event: Filter): void {
    this._filters$.next($event);
  }
}
