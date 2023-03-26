import { NgForOf, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Required } from '@lib/decorators/required-attribute';
import { Schema } from '@lib/models/filters.model';
import { CustomKeyValuePipe } from '@lib/pipes/custom-key-value.pipe';

@Component({
  selector: 'custom-filters',
  standalone: true,
  imports: [
    /* @angular */
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    /* @lib */
    CustomKeyValuePipe,
  ],
  templateUrl: './custom-filters.component.html',
  styleUrls: ['./custom-filters.component.scss']
})
export class CustomFiltersComponent implements OnInit {

  @Input() @Required schema: Schema;

  protected form: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // generate form controls based on defined schema
    const controls = Object.entries(this.schema).reduce((accumulator, [key, value]) => {
      accumulator[key] = new FormControl('', { nonNullable: true });
      return accumulator;
    }, {});
    this.form = new FormGroup(controls);
    // set the initial values
    this.form.patchValue(this.route.snapshot.queryParams);
  }

  updateFilters(): void {
    this.router.navigate([], {
      queryParams: {
        ...this.form.value,
        pageIndex: 0
      }
    });
  }
}
