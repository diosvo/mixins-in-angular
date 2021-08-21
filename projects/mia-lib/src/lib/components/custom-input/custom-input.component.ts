import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  encapsulation: ViewEncapsulation.None,
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
})

export class CustomInputComponent implements ControlValueAccessor, Validator {
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
  @Input() type!: string;
  @Input() name!: string;
  @Input() label!: string;
  @Input() pattern!: string;
  @Input() placeholder!: string;
  @Input() required = false;
  @Input() readonly!: boolean;

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

  validate(control: FormControl) {
    if (!this.control) {
      this.control = control;
      return null;
    }
  }
}
