import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

type InputType = 'string' | 'number';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})

export class CustomInputComponent implements ControlValueAccessor, Validator {
  // Field
  @Input() style = 'width: 100%';
  @Input() appearance: MatFormFieldAppearance | 'none' = 'outline';

  // Input
  @Input() type!: string;
  @Input() label?: string;
  @Input() pattern?: string;
  @Input() placeholder?: string;
  @Input() required = false;
  @Input() readonly?: boolean;

  disabled = false;

  /** Callback when the value is changing **/
  onChange: (value: InputType) => void;
  /** Callback when the input is accessed **/
  onTouched: () => void;

  private _value: InputType;
  control: FormControl;

  get value(): InputType {
    return this._value;
  }

  set value(v: InputType) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  writeValue(value: InputType): void {
    if (value !== undefined) {
      this._value = value;
    }
  }

  registerOnChange(fn: (_: InputType) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: FormControl): FormControl {
    if (!this.control) {
      this.control = control;
      return null;
    }
  }
}
