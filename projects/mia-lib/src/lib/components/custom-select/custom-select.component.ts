import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe, NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Required } from '@lib/decorators/required-attribute';
import { HighlightDirective } from '@lib/directives/highlight.directive';
import { TrackByKeyDirective } from '@lib/directives/track-by-key.directive';
import { FilterPipe } from '@lib/pipes/filter.pipe';
import isEqual from 'lodash.isequal';
import { distinctUntilChanged, Observable, of, startWith, switchMap } from 'rxjs';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { FormControlValueAccessorConnector } from '../form-control-value-accessor-connector/form-control-value-accessor-connector.component';

@Component({
  selector: 'custom-select',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    TitleCasePipe,
    ReactiveFormsModule,

    FilterPipe,
    HighlightDirective,
    TrackByKeyDirective,

    CustomInputComponent,

    MatSelectModule,
    MatDividerModule,
    MatCheckboxModule,
    MatFormFieldModule,
  ],
  templateUrl: './custom-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomSelectComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSelectComponent<T> extends FormControlValueAccessorConnector implements OnInit {

  @Input() @Required items: T[];

  @Input() bindLabelKey: string;
  @Input() bindValueKey: string;

  @Input() checkAll = true;
  @Input() placeholder = $localize`Select`;
  @Input() searchPlaceholder = $localize`Search`;
  @Input() appearance: MatFormFieldAppearance | 'none' = 'outline';

  protected items$: Observable<T[]>;
  protected query = new FormControl('', { nonNullable: true });

  protected selection = new SelectionModel<T>(true, []);

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.items$ = this.query.valueChanges.pipe(
      startWith(this.query.value),
      distinctUntilChanged(),
      switchMap((query: string) => {
        const data = new FilterPipe<T>().transform(this.items, query);
        return of(data);
      })
    );
  }

  selectionChange(change: MatSelectChange): void {
    this.selection.setSelection(...change.value);
  }

  openedChange(opened: boolean): void {
    this.query.reset();
    // only emit control value after closing the panel
    if (!opened) {
      this.control.setValue(this.selection.selected);
    }
  }

  sortFunc(prev?: T, next?: T): number {
    if (this.bindLabelKey) {
      return prev[this.bindLabelKey] < next[this.bindLabelKey] ? -1 : 1;
    }
    return 1;
  }

  get isAllSelected(): boolean {
    return isEqual(this.items.length, this.selection.selected.length);
  }

  masterToggle(event: MatCheckboxChange): void {
    event.checked
      ? this.selection.setSelection(...this.items)
      : this.selection.deselect();
  }
}

// ref: https://marselbeqiri.medium.com/angular-material-custom-mat-select-with-search-functionality-4b2b69b47511

