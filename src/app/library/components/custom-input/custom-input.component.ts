import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../../models/base-form-component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomInputComponent,
      multi: true
    }
  ]
})
export class CustomInputComponent implements BaseFormComponent, ControlValueAccessor {
  @Input() label!: string;
  @Input() placeholder!: string;

  value: string;
  onChange!: (value: string) => void;
  onTouched!: () => void;

  writeValue(obj: string): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }
}
