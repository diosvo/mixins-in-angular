import { Directive, ElementRef } from '@angular/core';


@Directive({
  selector: '[elementRef]',
  exportAs: 'elementRef',
  standalone: true
})
export class ElementDirective<T extends Element> extends ElementRef<T> {

  constructor({ nativeElement }: ElementRef<T>) {
    super(nativeElement);
  }

}

/** 
 * @usage <input #ref="elementRef" elementRef />
 * <button (click)="ref.nativeElement.focus()">Click here!</button>
 */