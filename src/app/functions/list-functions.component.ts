import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardItemComponent } from '@home/components/card-item/card-item.component';
import { EFunctions, EUrl } from '@home/models/url.enum';
import { CardItem, SearchService } from '@home/services/search.service';
import { AlertModule } from '@lib/components/alert/alert.module';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { CustomSelectComponent } from '@lib/components/custom-select/custom-select.component';
import { HttpRequestState } from '@lib/models/server.model';
import isEqual from 'lodash.isequal';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

const groupList = Object.values(EFunctions).sort();
const DEFAULT_FILTER = {
  query: '',
  group: []
};

@Component({
  selector: 'app-list-functions',
  templateUrl: './list-functions.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    AlertModule,
    CardItemComponent,
    CustomButtonModule,
    CustomInputComponent,
    CustomSelectComponent,

    MatTooltipModule,
    MatExpansionModule,
    MatProgressBarModule
  ],
  styles: [`
  @import 'layout/breakpoints';
  @include screen('extra-small') {
    .panel-container {
        display: block;
    }
  }`],
})
export class ListFunctionsComponent implements OnInit {

  state$: Observable<HttpRequestState<CardItem[]>>;

  readonly selection = groupList;
  form = this.fb.group({
    query: [DEFAULT_FILTER.query],
    group: [DEFAULT_FILTER.group]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly searchService: SearchService,
  ) { }

  ngOnInit(): void {
    const filters$ = this.form.valueChanges.pipe(startWith(this.form.value));
    this.state$ = this.searchService.getData(EUrl.FUNCTION, filters$, this.selection);
  }

  cleanFilters(): void {
    this.form.setValue(DEFAULT_FILTER);
  }

  clearAllIconActive(): boolean {
    return !this.primitiveFilters;
  }

  private get primitiveFilters(): boolean {
    return isEqual(this.query.value, DEFAULT_FILTER.query) && isEqual(this.group.value, DEFAULT_FILTER.group);
  }

  get query(): FormControl {
    return this.form.get('query') as FormControl;
  }

  get group(): FormControl {
    return this.form.get('group') as FormControl;
  }
}
