import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { MatFormFieldAppearance } from "@angular/material/form-field";

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  ],
  styles: [`
    .custom-input-icon-suffix {
      position: absolute;
      top: -1.25rem;
      right: -0.25rem;
    }
  `]
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
  @Input() showAsterisk = false;
  @Input() readonly?: boolean;

  disabled = false;

  /** Callback when the value is changing **/
  onChange: (value: unknown) => void;
  /** Callback when the input is accessed **/
  onTouched: () => void;

  private _value: unknown;
  control: FormControl;

  get value(): unknown {
    return this._value;
  }

  set value(v: unknown) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  writeValue(value: unknown): void {
    if (value !== undefined) {
      this._value = value;
    }
  }

  registerOnChange(fn: (_: unknown) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: FormControl) {
    if (!this.control) {
      this.control = control;
      return null;
    }
  }
}
