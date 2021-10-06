import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  @Input() dataSource = new MatTableDataSource<GithubIssue>([]);

  filterForm: FormGroup = this.fb.group({
    query: [''],
    state: ['']
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
        this.onFilter();
        this.applyFilter(filter);
      });
  }

  private applyFilter(filter: Filter): void {
    this.dataSource.filter = JSON.stringify(filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private onFilter(): void {
    this.dataSource.filterPredicate = ((data: GithubIssue, filterForm: string) => {
      const filterValues = JSON.parse(filterForm);
      let conditions = true;

      for (let key in filterValues) {
        if (key === 'query') {
          const searchTerm = data.number + data.title;
          conditions = conditions && searchTerm.toLowerCase().indexOf(filterValues['query'].trim().toLowerCase()) !== -1;
        }
        else if (filterValues[key] !== null && filterValues[key].length) {
          conditions = conditions && filterValues[key].includes(data[key].trim().toLowerCase());
        }
      }

      return conditions;
    });
  }

  resetForm(): void {
    this.filterForm.setValue({
      query: '',
      state: ''
    });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
