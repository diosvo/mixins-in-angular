import { Component, OnInit, Self } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { TableColumn } from '@lib/components/custom-table/custom-table.component';
import isEmpty from 'lodash.isempty';
import { catchError, combineLatest, map, Observable, startWith, Subject, switchMap, throwError } from 'rxjs';
import { GithubApi, GithubIssue } from '../../models/service.model';
import { GithubRepoIssuesService } from '../../service/github-repo-issues.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styles: ['@use \'chip\';'],
  providers: [GithubRepoIssuesService]
})

export class DataTableComponent implements OnInit {

  issues$: Observable<GithubIssue[]>;
  errorMessage$ = new Subject<boolean>();

  readonly states = ['open', 'closed'];

  columns: TableColumn[] = [
    { key: 'created_at', flex: '15%' },
    { key: 'state', disableSorting: true, flex: '15%' },
    { key: 'number', flex: '15%' },
    { key: 'title', flex: '55%' },
  ];
  filterForm: FormGroup = this.fb.group({
    query: ['', { initialValueIsDefault: true }],
    state: [this.states, { initialValueIsDefault: true }]
  });

  resultsLength: number;
  private _pageIndex$ = new Subject<number>();

  constructor(
    private readonly fb: FormBuilder,
    @Self() private readonly service: GithubRepoIssuesService
  ) { }

  ngOnInit(): void {
    this.getIssues();
  }

  private getIssues(): void {
    const data$ = this._pageIndex$.pipe(
      startWith(0),
      switchMap((page: number) => this.service.getRepoIssues(page)),
      map((data: GithubApi): GithubIssue[] => {
        if (isEmpty(data)) {
          return [];
        }

        this.resultsLength = data.total_count;
        return data.items;
      }),
    );
    const filters$ = this.filterForm.valueChanges.pipe(startWith(this.filterForm.value));

    this.issues$ = combineLatest([data$, filters$]).pipe(
      map(([data, params]): GithubIssue[] =>
        data
          .filter((item: GithubIssue) => {
            const searchTerm = item.number + item.title;
            return searchTerm.trim().toLowerCase().includes(params.query.trim().toLowerCase());
          })
          .filter((item: GithubIssue) => params.state.includes(item.state))
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
}
