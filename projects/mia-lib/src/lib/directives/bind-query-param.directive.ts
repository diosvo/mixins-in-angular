import { Directive, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Directive({
  selector: '[bindQueryParams]',
  standalone: true
})
export class BindQueryParamsDirective implements OnInit {

  constructor(private readonly ngControl: ControlContainer) { }

  ngOnInit(): void {
    if (location.search) {
      const queryParams = new URLSearchParams(location.search);
      const value = Object.entries(queryParams.entries());
      this.ngControl.control.patchValue(value);
    }
  }
}
