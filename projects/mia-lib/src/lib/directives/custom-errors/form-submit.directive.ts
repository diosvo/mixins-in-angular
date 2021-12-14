import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Input, NgModule } from '@angular/core';
import { fromEvent, shareReplay, tap } from 'rxjs';

/* ControlErrorComponent */

@Component({
  template: '<p class="text-error f-12" [class.d-none]="_hide">{{ _text }}</p>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {
  _text: string;
  _hide: boolean = true;

  @Input() set text(value) {
    if (value !== this._text) {
      this._text = value;
      this._hide = !value;
      this.cdr.detectChanges();
    }
  };

  constructor(private cdr: ChangeDetectorRef) { }

}

/* FormSubmitDirective */

@Directive({
  selector: '[form]'
})
export class FormSubmitDirective {
  submit$ = fromEvent(this.element, 'submit').pipe(
    tap(() => {
      if (this.element.classList.contains('submitted') === false) {
        this.element.classList.add('submitted');
      }
    }),
    shareReplay(1)
  )

  constructor(
    private readonly host: ElementRef<HTMLFormElement>
  ) { }

  get element(): HTMLFormElement {
    return this.host.nativeElement;
  }
}

@NgModule({
  declarations: [FormSubmitDirective],
  exports: [FormSubmitDirective]
})
export class FormSubmitDirectiveModule { }