import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Filter } from '../../models/filter.model';
import { GithubIssue } from '../../models/service.model';

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  @Output() changed = new EventEmitter<Filter>();
  @Input() dataSource = new MatTableDataSource<GithubIssue>([]);

  filterForm: FormGroup = this.fb.group({
    query: [''],
    state: []
  })
  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((filter: Filter) => {
        this.changed.emit(filter);
        this.applyFilter(filter);
      });
  }

  private applyFilter(filter: Filter): void {
    this.dataSource.filter = JSON.stringify(filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
