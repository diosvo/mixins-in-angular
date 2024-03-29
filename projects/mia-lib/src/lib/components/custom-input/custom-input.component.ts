import { NgIf, TitleCasePipe } from '@angular/common';
import { Component, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelType, MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { ControlAccessorConnector } from '../form/helpers/control-accessor-connector.component';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  standalone: true,
  imports: [
    NgIf,
    TitleCasePipe,
    ReactiveFormsModule,

    CustomButtonComponent,

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

export class CustomInputComponent extends ControlAccessorConnector {
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

  protected readonly EMPTY_VALUE = '';

  constructor(injector: Injector) {
    super(injector);
  }
}
