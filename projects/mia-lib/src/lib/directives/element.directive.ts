import { Directive, ElementRef, NgModule } from '@angular/core';


@Directive({
  selector: '[elementRef]',
  exportAs: 'elementRef'
})
export class ElementDirective<T extends Element> extends ElementRef<T> {

  constructor({ nativeElement }: ElementRef<T>) {
    super(nativeElement);
  }

}

@NgModule({
  declarations: [ElementDirective],
  exports: [ElementDirective]
})
export class ElementDirectiveModule { }

/** 
 * @usage <input #ref="elementRef" elementRef />
 * <button (click)="ref.nativeElement.focus()">Click here!</button>
 */