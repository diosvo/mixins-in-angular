import { Component, EventEmitter, Injector, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { debounceTime, Observable, of, startWith, Subject, takeUntil } from 'rxjs';
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
export class CustomSelectComponent<T> extends FormControlValueAccessorConnector implements OnInit, OnChanges, OnDestroy {
  @Input() placeholder: string = 'Select';
  @Input() items: Array<T> | Observable<Array<T>> = [];
  @Output() selectedItem = new EventEmitter<string>();
  filterControl: FormControl = new FormControl('');

  @Input() bindLabelKey: string;
  @Input() bindValueKey: string;
  @Input() bindKeyValue: boolean = false;
  @Input() searchPlaceholder: string = 'Search your item...';

  @Input() appearance: MatFormFieldAppearance | 'none' = 'outline';

  private isServerSide: boolean = true;
  private currentStaticItems: Array<T> = [];
  private destroyed$ = new Subject<boolean>();

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnChanges(): void {
    if (this.items instanceof Array) {
      this.currentStaticItems = this.items;
      this.items = of(this.items);
      this.isServerSide = false;
      return;
    }
    throw new Error('The items should be an array.');
  }

  ngOnInit(): void {
    this.watchForFilterChanges();
  }

  private watchForFilterChanges(): void {
    this.filterControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(200),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (value: string) => this.isServerSide ? this.selectedItem.emit(value) : this.filteredItems(value)
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
    if (this.bindKeyValue && typeof value !== 'string') {
      return value = value[this.bindLabelKey];
    }
    return (value as string).toLowerCase().replace(/\s/g, '');
  }

  sortFunc(prev?: T, next?: T): number {
    if (this.bindKeyValue) {
      return prev[this.bindLabelKey] < next[this.bindLabelKey] ? -1 : 1;
    }
    return 1;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
