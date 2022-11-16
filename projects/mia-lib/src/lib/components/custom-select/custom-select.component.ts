import { AsyncPipe, NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Required } from '@lib/decorators/required-attribute';
import { HighlightDirective } from '@lib/directives/highlight.directive';
import { TrackByKeyDirective } from '@lib/directives/track-by-key.directive';
import { NgChanges } from '@lib/helpers/mark-function-properties';
import { FilterPipe } from '@lib/pipes/filter.pipe';
import isEqual from 'lodash.isequal';
import { distinctUntilChanged, Observable, of, startWith, switchMap } from 'rxjs';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { ControlAccessorConnector } from '../form/helpers/control-accessor-connector.component';

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
export class CustomSelectComponent<T> extends ControlAccessorConnector implements OnChanges, OnInit {

  @Input() @Required items: T[];

  @Input() bindLabelKey: string;
  @Input() bindValueKey: string;

  @Input() checkAll = true;
  @Input() placeholder = $localize`Select`;
  @Input() searchPlaceholder = $localize`Search`;
  @Input() appearance: MatFormFieldAppearance | 'none' = 'outline';

  protected items$: Observable<T[]>;
  protected query = new FormControl('', { nonNullable: true });

  private primitiveItems: T[];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnChanges(changes: NgChanges<CustomSelectComponent<T>>): void {
    if (changes.items && changes.items.firstChange) {
      this.primitiveItems = this.items;
    }
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

  get isAllSelected(): boolean {
    return isEqual(this.control.value.length, this.primitiveItems.length);
  }

  masterToggle(event: MatCheckboxChange): void {
    this.control.setValue(event.checked ? this.primitiveItems : []);
  }
}
