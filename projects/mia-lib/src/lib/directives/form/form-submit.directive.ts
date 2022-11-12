import { Directive, ElementRef } from '@angular/core';
import isEqual from 'lodash.isequal';
import { fromEvent, shareReplay, tap } from 'rxjs';

@Directive({
  selector: 'form',
  standalone: true
})
export class FormSubmitDirective {

  submit$ = fromEvent(this.element, 'submit').pipe(
    tap(() => {
      if (isEqual(this.element.classList.contains('submitted'), false)) {
        this.element.classList.add('submitted');
      }
    }),
    shareReplay(1)
  );

  constructor(private readonly host: ElementRef<HTMLFormElement>) { }

  get element(): HTMLFormElement {
    return this.host.nativeElement;
  }
}