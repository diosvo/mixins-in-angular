import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { debounceTime, Observable, of, startWith, takeUntil } from 'rxjs';
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
  @Input() placeholder: string = 'Select';
  @Input() items: T[] | Observable<T[]> = [];
  @Output() selectedItem = new EventEmitter<string>();
  filterControl: FormControl = new FormControl('');

  @Input() bindLabelKey: string;
  @Input() bindValueKey: string;
  @Input() bindKeyValue: boolean = false;
  @Input() searchPlaceholder: string = 'Search your item...';

  @Input() appearance: MatFormFieldAppearance | 'none' = 'outline';

  private isServerSide: boolean = true;
  private currentStaticItems: T[] = [];

  constructor(
    injector: Injector,
    private readonly destroyed$: DestroyService
  ) {
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
    const items = this.currentStaticItems;
    const query = this.normalizeValue(value);
    const filterFn = new FilterPipe().transform(items, query) as T[];

    this.items = of(filterFn);
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
}
