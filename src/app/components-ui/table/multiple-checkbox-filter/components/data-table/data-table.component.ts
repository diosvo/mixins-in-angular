import { Component, OnInit, Self } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TableColumn } from '@lib/components/custom-table/custom-table.component';
import { HttpRequestState } from '@lib/models/server.model';
import { FilterObjectPipe } from '@lib/pipes/filter.pipe';
import isEmpty from 'lodash.isempty';
import { catchError, combineLatest, distinctUntilChanged, map, Observable, of, shareReplay, startWith, Subject, switchMap } from 'rxjs';
import { GithubIssue } from '../../models/service.model';
import { GithubRepoIssuesService } from '../../service/github-repo-issues.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styles: ['@use \'chip\';'],
  providers: [GithubRepoIssuesService]
})

export class DataTableComponent implements OnInit {

  state$: Observable<HttpRequestState<GithubIssue>>;

  readonly states = ['open', 'closed'];

  columns: TableColumn[] = [
    { key: 'created_at', flex: '15%' },
    { key: 'state', disableSorting: true, flex: '15%' },
    { key: 'number', flex: '15%' },
    { key: 'title', flex: '55%' },
  ];
  filterForm = this.fb.group({
    query: [''],
    state: [[]]
  });

  private index$ = new Subject<number>();

  constructor(
    private readonly fb: FormBuilder,
    @Self() private readonly service: GithubRepoIssuesService
  ) { }

  ngOnInit(): void {
    const page$ = this.index$.pipe(
      startWith(0),
      distinctUntilChanged()
    );
    const filters$ = this.filterForm.valueChanges.pipe(
      startWith(this.filterForm.value)
    );
    const data$ = page$.pipe(
      switchMap((page: number) => this.service.getRepoIssues(page).pipe(
        map(({ items, total_count }) => {
          if (isEmpty(items)) {
            return [];
          }
          return {
            data: items,
            total_count
          };
        }),
        catchError(({ message }) => of({ data: null, message, loading: false })),
        shareReplay(1)
      )),
    ) as Observable<HttpRequestState<GithubIssue>>;

    this.state$ = combineLatest([data$, filters$]).pipe(
      map(([state, params]) => ({
        ...state,
        data: state.data
          .filter((item: GithubIssue) => new FilterObjectPipe().transform(item, params.query))
          .filter((item: GithubIssue) => {
            const collection = isEmpty(params.state) ? this.states : params.state;
            return collection.includes(item.state);
          })
      }))
    );
  }

  pageChanges({ pageIndex }): void {
    this.index$.next(pageIndex);
  }
}
