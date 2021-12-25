import {
  ComponentFactoryResolver, ComponentRef, Directive, Host, Inject, InjectionToken, NgModule,
  OnDestroy, OnInit, Optional, Self, ViewContainerRef
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { EMPTY, merge, Observable, Subject, takeUntil } from 'rxjs';
import { ControlErrorComponent, FormSubmitDirective, FormSubmitDirectiveModule } from './form-submit.directive';

/* Form errors DI */

const default_errors = {
  required: (error) => 'This field is required',
  minlength: ({ required, actual }) => `Expect ${required} but got ${actual}`
};

const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => default_errors
});

/* ControlErrorsDirective */

@Directive({
  selector: '[formControl], [formControlName]',
  providers: [FormSubmitDirectiveModule]
})
export class ControlErrorsDirective implements OnInit, OnDestroy {

  private submit$: Observable<Event>;
  private destroyed$ = new Subject<boolean>();

  private container: ViewContainerRef;
  private compRef: ComponentRef<ControlErrorComponent>;

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly resolver: ComponentFactoryResolver,

    @Self() private readonly control: NgControl,
    @Inject(FORM_ERRORS) private readonly errors: unknown,
    @Optional() @Host() form: FormSubmitDirective,
    @Optional() errorContainer: ControlErrorContainerDirective,
  ) {
    this.submit$ = form ? form.submit$ : EMPTY;
    this.container = errorContainer ? errorContainer.vcr : vcr;
  }

  ngOnInit(): void {
    merge(this.submit$, this.control.valueChanges)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        const control_errors = this.control.errors;

        if (control_errors) {
          const first_key = Object.keys(control_errors)[0];
          const get_error = this.errors[first_key];
          const text = get_error(control_errors[first_key]);
          this.setError(text);
        } else if (this.compRef) {
          this.setError(null);
        }
      });
  }

  private setError(text: string) {
    if (!this.compRef) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.compRef = this.vcr.createComponent(factory);
    }

    this.compRef.instance.text = text;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

/* ControlErrorContainerDirective */

@Directive({
  selector: '[controlErrorContainer]'
})
export class ControlErrorContainerDirective {

  constructor(readonly vcr: ViewContainerRef) { }
}

@NgModule({
  declarations: [ControlErrorsDirective, ControlErrorContainerDirective],
  exports: [ControlErrorsDirective]
})
export class ControlErrorsDirectiveModule { }