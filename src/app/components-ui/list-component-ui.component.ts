import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardItemModule } from '@home/components/card-item/card-item.component.module';
import { EComponentUI } from '@home/models/url.enum';
import { CardItem, SearchService } from '@home/services/search.service';
import { AlertModule } from '@lib/components/alert/alert.module';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
import { CustomSelectModule } from '@lib/components/custom-select/custom-select.module';
import { FilterObjectPipe } from '@lib/pipes/filter.pipe';
import isEmpty from 'lodash.isempty';
import isEqual from 'lodash.isequal';
import { combineLatest, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

const groupList = Object.values(EComponentUI).sort();
const DEFAULT_FILTER = {
  query: '',
  group: []
};

@Component({
  selector: 'list-component-ui',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    AlertModule,
    CardItemModule,
    CustomInputModule,
    CustomButtonModule,
    CustomSelectModule,

    MatTooltipModule,
    MatExpansionModule,
    MatProgressBarModule
  ],
  templateUrl: './list-component-ui.component.html',
  styles: [`
  @import 'layout/breakpoints';
  @include screen('extra-small') {
    .panel-container {
      display: block;
    }
  }`],
})
export class ListComponentUiComponent implements OnInit {

  errorMessage$ = new Subject<string>();
  filteredData$: Observable<CardItem[]>;

  readonly selection = groupList;
  componentsForm: FormGroup = this.fb.group({
    query: [DEFAULT_FILTER.query],
    group: [DEFAULT_FILTER.group]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.onFilters();
  }

  /**
   * @description Search
   */

  private onFilters(): void {
    const data$ = this.searchService.uiComponentsList$;
    const filters$ = this.componentsForm.valueChanges.pipe(
      startWith(this.componentsForm.value),
    );

    this.filteredData$ = combineLatest([data$, filters$]).pipe(
      map(([data, filters]) =>
        data
          .filter((item: CardItem) => (isEmpty(this.group.value) ? groupList : filters.group).includes(item.group_id))
          .filter((item: CardItem) => new FilterObjectPipe().transform(item, filters.query))
      ),
      catchError(({ message }) => {
        this.errorMessage$.next(message);
        return throwError(() => new Error(message));
      })
    );
  }

  /**
   * @description Support
   */

  cleanFilters(): void {
    this.componentsForm.setValue(DEFAULT_FILTER);
  }

  clearAllIconActive(): boolean {
    return !this.primitiveFilters;
  }

  private get primitiveFilters(): boolean {
    return isEqual(this.query.value, DEFAULT_FILTER.query) && isEqual(this.group.value.length, DEFAULT_FILTER.group.length);
  }

  get query(): FormControl {
    return this.componentsForm.get('query') as FormControl;
  }

  get group(): FormControl {
    return this.componentsForm.get('group') as FormControl;
  }
}
