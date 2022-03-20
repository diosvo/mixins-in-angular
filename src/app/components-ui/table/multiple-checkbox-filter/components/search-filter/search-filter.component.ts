import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Filter } from '../../models/filter.model';

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html'
})
export class SearchFilterComponent implements OnInit {
  @Output() filters = new EventEmitter<Filter>();

  filterForm: FormGroup = this.fb.group({
    query: [''],
    state: ['']
  });

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
      )
      .subscribe(() => this.filters.emit(this.filterForm.getRawValue()));
  }
}
