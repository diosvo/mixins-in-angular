import { Component, OnInit, Self } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TableColumn } from '@lib/components/custom-table/custom-table.component';
import { BehaviorSubject, catchError, combineLatest, map, Observable, startWith, Subject, switchMap, throwError } from 'rxjs';
import { Filter } from '../../models/filter.model';
import { GithubApi, GithubIssue } from '../../models/service.model';
import { GithubRepoIssuesService } from '../../service/github-repo-issues.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styles: ['@use \'chip\';'],
  providers: [GithubRepoIssuesService]
})

export class DataTableComponent implements OnInit {
  errorMessage$ = new Subject<boolean>();
  issues$: Observable<Array<GithubIssue>>;

  columns: Array<TableColumn> = [
    { key: 'created_at', flex: '15%' },
    { key: 'state', disableSorting: true, flex: '15%' },
    { key: 'number', flex: '15%' },
    { key: 'title', flex: '55%' },
  ];
  private _filters$ = new BehaviorSubject<Partial<Filter>>({
    query: '',
    state: ''
  });
  readonly filters$ = this._filters$.asObservable();

  resultsLength: number;
  private _pageIndex$ = new Subject<number>();

  constructor(
    @Self() private readonly service: GithubRepoIssuesService
  ) { }

  ngOnInit(): void {
    this.getIssues();
  }

  private getIssues(): void {
    const data$ = this._pageIndex$.pipe(
      startWith(0),
      switchMap((page: number) => this.service.getRepoIssues(page)),
      map((data: GithubApi): Array<GithubIssue> => {
        if (data === null) {
          return [];
        }

        this.resultsLength = data.total_count;
        return data.items;
      }),
    );

    this.issues$ = combineLatest([data$, this.filters$]).pipe(
      map(([data, params]) =>
        data.filter((item: GithubIssue) => {
          let conditions = true;
          const filterValues = JSON.parse(JSON.stringify(params));

          for (const key in filterValues) {
            if (key === 'query') {
              const searchTerm = item.number + item.title;
              conditions = conditions && searchTerm.toLowerCase().indexOf(filterValues['query'].trim().toLowerCase()) !== -1;
            }
            else if (filterValues[key].length) {
              conditions = conditions && filterValues[key].includes(item[key].trim().toLowerCase());
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

  pageChanges({ pageIndex }: PageEvent): void {
    this._pageIndex$.next(pageIndex);
  }

  filteredIssues($event: Filter): void {
    this._filters$.next($event);
  }
}
