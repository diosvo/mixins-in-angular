import { ComponentRef, Directive, Host, Inject, InjectionToken, Input, OnInit, Optional, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ControlErrorComponent } from '@lib/components/form/control-error/control-error.component';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { EMPTY, merge, Observable, takeUntil } from 'rxjs';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { FormSubmitDirective } from './form-submit.directive';

export const DEFAULT_ERRORS: Record<string, Function> = {
  min: ({ min, actual }) => $localize`Expect min value is ${min} but got ${actual}`,
  max: ({ max, actual }) => $localize`Expect max value is ${max} but got ${actual}`,
  required: () => $localize`This field is required`,
  email: () => $localize`The email address is incorrect format`,
  minLength: ({ requiredLength, actualLength }) => $localize`Expect minimum of ${requiredLength} characters but got ${actualLength}`,
  maxLength: ({ requiredLength, actualLength }) => $localize`Expect maximum of ${requiredLength} characters but got ${actualLength}`,
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => DEFAULT_ERRORS
});

@Directive({
  selector: '[formControl], [formControlName]',
  standalone: true,
})
export class ControlErrorsDirective implements OnInit {

  @Input() customErrors = {};

  protected submit$: Observable<Event>;
  protected container: ViewContainerRef;
  protected ref: ComponentRef<ControlErrorComponent>;

  constructor(
    private readonly control: NgControl,
    private readonly vcr: ViewContainerRef,
    private readonly destroy$: DestroyService,
    @Inject(FORM_ERRORS) private readonly errors,
    @Optional() @Host() private readonly form: FormSubmitDirective,
    @Optional() readonly controlErrorContainer: ControlErrorContainerDirective
  ) {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
  }

  ngOnInit(): void {
    merge(this.submit$, this.control.valueChanges)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          const controlErrors = this.control.errors;

          if (controlErrors) {
            const firstKey = Object.keys(controlErrors).at(0);
            const getError = this.errors[firstKey];
            const text = this.customErrors[firstKey] || getError(controlErrors[firstKey]);
            this.setError(text);
          } else if (this.ref) {
            this.setError(null);
          }
        }
      });
  }

  private setError(text: string): void {
    if (!this.ref) {
      this.ref = this.vcr.createComponent(ControlErrorComponent);
    }

    this.ref.instance.error = text;
  }

}
