import { Component, inject, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, FormControlDirective } from '@angular/forms';

@Component({})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class FormControlValueAccessorConnector implements ControlValueAccessor {
  // used to synchronize a standalone FormControl instance
  @ViewChild(FormControlDirective, { static: true }) formControlDirective?: FormControlDirective;

  @Input() formControl?: FormControl;
  @Input() formControlName?: string;

  protected injector = inject(Injector);

  /* make connection with provided formControl of parents */

  get control(): AbstractControl {
    return this.formControl || this.controlContainer.control.get(this.formControlName);
  }

  private get controlContainer(): ControlContainer {
    return this.injector.get(ControlContainer);
  }

  writeValue(obj: any): void {
    this.formControlDirective.valueAccessor.writeValue(obj);
  }

  registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnTouched(fn);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
  }
}
