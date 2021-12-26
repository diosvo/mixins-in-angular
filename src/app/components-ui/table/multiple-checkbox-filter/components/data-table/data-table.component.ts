import { Component, OnInit, Self } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TableColumn } from '@lib/components/custom-table/custom-table.component';
import { FilterSchema, HandleService } from '@lib/services/base/handle.service';
import { BehaviorSubject, catchError, map, Observable, startWith, Subject, switchMap, throwError } from 'rxjs';
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
    { key: 'created_at', header: 'Created At', flex: '10%' },
    { key: 'state', disableSorting: true, flex: '10%' },
    { key: 'number', flex: '10%' },
    { key: 'title', flex: '70%' },
  ];
  private _filters$ = new BehaviorSubject<Partial<Filter>>({
    query: '',
    state: '',
    created_at: ''
  });
  readonly filters$ = this._filters$.asObservable();

  resultsLength: number;
  private _pageIndex$ = new Subject<number>();

  constructor(
    private readonly handle: HandleService,
    @Self() readonly service: GithubRepoIssuesService
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

    const schemas = {
      date: {
        type: 'string'
      },
      state: {
        type: 'array',
        enums: ['open', 'closed']
      },
      query: {
        type: 'string',
        enums: ['number', 'title']
      },
    } as FilterSchema;

    this.issues$ = this.handle.filteredData(data$, this.filters$, schemas).pipe(
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
