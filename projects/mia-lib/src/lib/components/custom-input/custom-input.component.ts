import { CommonModule } from '@angular/common';
import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelType, MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DisableControlDirective } from '@lib/directives/disable-control.directive';
import { CustomButtonModule } from '../custom-button/custom-button.module';
import { FormControlValueAccessorConnector } from '../form-control-value-accessor-connector/form-control-value-accessor-connector.component';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    CustomButtonModule,
    DisableControlDirective,

    MatInputModule,
    MatFormFieldModule,
  ],
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
  @Input() disabled = false;
  @Input() clearFilter = false;

  readonly EMPTY_VALUE = '';
  protected allow = true;

  constructor(injector: Injector) {
    super(injector);
  }
}
