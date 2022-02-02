import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { sortBy } from '@lib/utils/array-utils';
import { debounceTime, Observable, of, startWith } from 'rxjs';
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
  @Input() placeholder: string = 'Select';
  @Input() items: Array<T> | Observable<Array<T>> = [];
  @Output() selectedItem = new EventEmitter<string>();
  filterControl: FormControl = new FormControl('');

  @Input() bindLabelKey: string = 'default';
  @Input() bindValueKey: string = 'default';
  @Input() searchPlaceholder: string = 'Search your item...';

  @Input() sortByKey: string;
  @Input() appearance: MatFormFieldAppearance | 'none' = 'outline';

  private isServerSide: boolean = true;
  private currentStaticItems: Array<T> = [];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnChanges(): void {
    if (this.items instanceof Array) {
      this.currentStaticItems = this.items;
      this.items = of(this.items);
      this.isServerSide = false;
    }
  }

  ngOnInit(): void {
    this.watchForFilterChanges();
  }

  private watchForFilterChanges(): void {
    this.filterControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(200)
      )
      .subscribe({
        next: (value: string) => {
          this.isServerSide ? this.selectedItem.emit(value) : this.filteredItems(value);
        }
      });
  }

  private filteredItems(value: string): void {
    const currentItems = this.currentStaticItems;
    const filterValue = this.normalizeValue(value);

    this.items = of(
      currentItems.filter((item: T) => this.normalizeValue(item).includes(filterValue))
    );
  }

  private normalizeValue(value: unknown): string {
    if (typeof value !== 'string') {
      value = value[this.bindLabelKey];
    }
    return (value as string).toLowerCase().replace(/\s/g, '');
  }

  sortFunc(): number {
    if (this.sortByKey) {
      sortBy(this.currentStaticItems, this.sortByKey);
      return;
    }
    return 1;
  }
}
