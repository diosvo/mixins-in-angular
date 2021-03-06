import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSelectChange } from '@angular/material/select';
import { Required } from '@lib/decorators/required-attribute';
import { NgChanges } from '@lib/helpers/mark-function-properties';
import isEqual from 'lodash.isequal';
import { combineLatest, map, Observable, of, startWith } from 'rxjs';
import { FilterPipe } from '../../pipes/filter.pipe';
import { FormControlValueAccessorConnector } from '../form-control-value-accessor-connector/form-control-value-accessor-connector.component';

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomSelectComponent,
      multi: true
    }
  ]
})
export class CustomSelectComponent<T> extends FormControlValueAccessorConnector implements OnInit, OnChanges {

  @Input() @Required items: T[] | Observable<T[]>;
  @Output() readonly selected = new EventEmitter<T[]>();

  @Input() bindLabelKey: string;
  @Input() bindValueKey: string;
  @Input() bindKeyValue = false;

  @Input() checkAll = true;
  @Input() placeholder = 'Select';
  @Input() searchPlaceholder = 'Search';
  @Input() appearance: MatFormFieldAppearance | 'none' = 'outline';

  private primitiveItems: T[];
  query = new FormControl('');

  constructor(
    readonly injector: Injector,
  ) {
    super(injector);
  }

  ngOnChanges(changes: NgChanges<CustomSelectComponent<T>>): void {
    if (changes.items && changes.items.firstChange && this.items instanceof Array) {
      this.primitiveItems = this.items;
      this.items = of(this.items);
    }
  }

  ngOnInit(): void {
    this.watchForChanges();
  }

  private watchForChanges(): void {
    const query$ = this.query.valueChanges.pipe(
      startWith(this.query.value)
    );
    this.items = combineLatest([this.items as Observable<T[]>, query$]).pipe(
      map(([data, query]) => new FilterPipe().transform(data, query) as T[]),
    );
  }

  sortFunc(prev?: T, next?: T): number {
    if (this.bindKeyValue) {
      return prev[this.bindLabelKey] < next[this.bindLabelKey] ? -1 : 1;
    }
    return 1;
  }

  selectionChange(change: MatSelectChange): void {
    this.control.setValue(change.value);
  }

  /* Functions to support Check All feature */

  hasValue(): boolean {
    return this.primitiveItems.length > 0;
  }

  isAllSelected(): boolean {
    return isEqual(this.control.value.length, this.primitiveItems.length);
  }

  toggleSelection(change: MatCheckboxChange): void {
    this.control.setValue(change.checked ? this.primitiveItems : []);
  }
}
