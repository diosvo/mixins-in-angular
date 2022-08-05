import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Self } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertComponent } from '@lib/components/alert/alert.component';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { CustomSelectComponent } from '@lib/components/custom-select/custom-select.component';
import { TableColumn } from '@lib/components/custom-table/custom-table.component';
import { CustomTableModule } from '@lib/components/custom-table/custom-table.module';
import { HttpRequestState } from '@lib/models/server.model';
import { FilterObjectPipe } from '@lib/pipes/filter.pipe';
import isEmpty from 'lodash.isempty';
import { catchError, combineLatest, map, Observable, of, shareReplay, startWith, Subject, switchMap } from 'rxjs';
import { AngularIssue, GithubRepoIssuesService } from '../../service/github-repo-issues.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatProgressSpinnerModule,

    AlertComponent,
    CustomTableModule,
    CustomInputComponent,
    CustomSelectComponent
  ],
  styles: ['@use \'chip\';'],
  providers: [GithubRepoIssuesService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DataTableComponent implements OnInit {

  state$: Observable<HttpRequestState<AngularIssue>>;

  readonly states = ['open', 'closed'];
  readonly authors = ['none', 'collaborator', 'member'];

  columns: TableColumn[] = [
    { key: 'id', flex: '10%' },
    { key: 'created_at', flex: '10%' },
    { key: 'state', disableSorting: true, flex: '10%' },
    { key: 'number', flex: '10%' },
    { key: 'title', flex: '50%' },
  ];
  filterForm = this.fb.group({
    query: [''],
    states: [[]],
    authors: [[]],
  });

  private index$ = new Subject<number>();

  constructor(
    private readonly fb: FormBuilder,
    @Self() private readonly service: GithubRepoIssuesService
  ) { }

  ngOnInit(): void {
    const filters$ = this.filterForm.valueChanges.pipe(
      startWith(this.filterForm.value)
    );
    const data$ = this.index$.pipe(
      startWith(0),
      switchMap((page: number) => this.service.getRepoIssues(page).pipe(
        map(({ items }) => {
          if (isEmpty(items)) {
            return [];
          }
          return {
            data: items,
            loading: false,
            total_count: 1000
          };
        }),
        catchError(({ message }) => of({ message, loading: false })),
        shareReplay(1),
        startWith({ data: [], loading: true })
      )),
    ) as Observable<HttpRequestState<AngularIssue>>;

    this.state$ = combineLatest([data$, filters$]).pipe(
      map(([state, params]) => ({
        ...state,
        data: state.data
          .filter((item: AngularIssue) => {
            const states = isEmpty(params.states) ? this.states : params.states;
            const authors = isEmpty(params.authors) ? this.authors : params.authors;

            return new FilterObjectPipe().transform(item, params.query)
              && states.includes(item.state)
              && authors.includes(item.author_association.toLowerCase());
          })
      }))
    );
  }

  pageChanges({ pageIndex }): void {
    this.index$.next(pageIndex);
  }
}
