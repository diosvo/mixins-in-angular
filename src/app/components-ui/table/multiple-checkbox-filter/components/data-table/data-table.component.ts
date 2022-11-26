import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Params } from '@angular/router';
import { AlertComponent } from '@lib/components/alert/alert.component';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { CustomSelectComponent } from '@lib/components/custom-select/custom-select.component';
import { TableColumnDirective } from '@lib/components/custom-table/custom-table-abstract.directive';
import { CustomTableComponent, TableColumn } from '@lib/components/custom-table/custom-table.component';
import { NoResultsComponent } from '@lib/components/no-results/no-results.component';
import { State } from '@lib/models/server.model';
import { distinctUntilChanged, Observable, startWith, switchMap } from 'rxjs';
import { GithubRepoIssuesService, Issue } from '../../service/github-repo-issues.service';

@Component({
  selector: 'github-issues-data-table',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    AsyncPipe,
    ReactiveFormsModule,

    AlertComponent,
    NoResultsComponent,
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

  protected state$: Observable<State<Issue>>;
  protected FILTERS = this.service.FILTERS_OPTIONS;

  protected readonly columns: TableColumn[] = [
    { key: 'id', flex: '10%' },
    { key: 'created_at', flex: '10%' },
    { key: 'state', disableSorting: true, flex: '10%' },
    { key: 'number', flex: '10%' },
    { key: 'title', flex: '50%' },
  ];
  protected form = this.fb.nonNullable.group({
    page: [0],
    query: [''],
    states: [this.service.DEFAULT_STATES],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: GithubRepoIssuesService
  ) { }

  ngOnInit(): void {
    this.state$ = this.form.valueChanges.pipe(
      startWith(this.form.value),
      distinctUntilChanged(),
      switchMap((values: Params) => this.service.getRepoIssues(values)),
    );
  }

  pageChanges({ pageIndex }): void {
    this.form.patchValue({ page: pageIndex });
  }
}
