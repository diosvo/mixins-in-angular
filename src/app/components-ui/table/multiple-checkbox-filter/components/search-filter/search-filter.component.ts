import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Filter } from '../../models/filter.model';

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html'
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  @Output() filters = new EventEmitter<Filter>();

  filterForm: FormGroup = this.fb.group({
    query: [''],
    state: ['']
  })
  private destroyed$ = new Subject<boolean>();

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        takeUntil(this.destroyed$)
      )
      .subscribe((filter: Filter) => this.filters.emit(filter));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
