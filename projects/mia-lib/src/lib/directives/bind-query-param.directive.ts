import { CommonModule } from '@angular/common';
import { Directive, Input, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';

@Directive({
  selector: '[bindQueryParam]'
})
export class BindQueryParamDirective implements OnInit {

  @Input('bindQueryParam') paramKey: string;

  constructor(private readonly ngControl: NgControl) { }

  ngOnInit(): void {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has(this.paramKey)) {
      this.ngControl.control.patchValue(queryParams.get(this.paramKey));
    }
  }

}

@NgModule({
  declarations: [BindQueryParamDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [BindQueryParamDirective]
})
export class BindQueryParamDirectiveModule { }