import { Directive, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[bindQueryParam]',
  standalone: true
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
