import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Self } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Params } from '@angular/router';
import { AlertComponent } from '@lib/components/alert/alert.component';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { CustomSelectComponent } from '@lib/components/custom-select/custom-select.component';
import { TableColumnDirective } from '@lib/components/custom-table/custom-table-abstract.directive';
import { CustomTableComponent, TableColumn } from '@lib/components/custom-table/custom-table.component';
import { HttpRequestState } from '@lib/models/server.model';
import { catchError, map, Observable, of, shareReplay, startWith, Subject, switchMap } from 'rxjs';
import { GithubRepoIssuesService, Issue } from '../../service/github-repo-issues.service';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatProgressSpinnerModule,

    AlertComponent,
    CustomTableComponent,
    CustomInputComponent,
    CustomSelectComponent,
    TableColumnDirective
  ],
  styleUrls: ['./data-table.component.scss'],
  providers: [GithubRepoIssuesService],
  templateUrl: './data-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DataTableComponent implements OnInit {

  state$: Observable<HttpRequestState<Issue>>;

  readonly states = ['is\:open', 'is:\closed'];
  readonly authors = ['none', 'collaborator', 'member'];

  columns: TableColumn[] = [
    { key: 'id', flex: '10%' },
    { key: 'created_at', flex: '10%' },
    { key: 'state', disableSorting: true, flex: '10%' },
    { key: 'number', flex: '10%' },
    { key: 'title', flex: '50%' },
  ];
  protected form = this.fb.group({
    query: [''],
    states: [this.states],
    authors: [[]],
  });
  private params$ = new Subject<Params>();

  constructor(
    private readonly fb: FormBuilder,
    @Self() private readonly service: GithubRepoIssuesService
  ) { }

  ngOnInit(): void {
    this.state$ = this.params$.pipe(
      startWith({ page: '0', ...this.form.value }),
      switchMap(({ page, ...rest }) => {
        return this.service.getRepoIssues({ page, ...rest }).pipe(
          map(({ items }) => ({ data: items, loading: false })),
          catchError(({ message }) => of({ message, loading: false })),
          startWith({ data: [], loading: true }),
          shareReplay(1),
        );
      }),
    );
  }

  pageChanges({ pageIndex }): void {
    this.params$.next({ page: pageIndex.toString(), ...this.form.value });
  }
}
