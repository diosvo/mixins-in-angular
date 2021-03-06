import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field';
import { FormControlValueAccessorConnector } from '../form-control-value-accessor-connector/form-control-value-accessor-connector.component';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    },
  ]
})

export class CustomInputComponent extends FormControlValueAccessorConnector {
  // Field
  @Input() style = 'width: 100%';
  @Input() floatLabel: FloatLabelType = 'auto';
  @Input() appearance: MatFormFieldAppearance | 'none' = 'outline';

  // Input
  @Input() type = 'string';
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() readonly = false;
  @Input() clearFilter = false;

  readonly EMPTY_VALUE = '';

  constructor(injector: Injector) {
    super(injector);
  }
}
