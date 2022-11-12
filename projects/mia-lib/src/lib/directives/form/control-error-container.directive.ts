import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[controlErrorContainer]',
  standalone: true
})
export class ControlErrorContainerDirective {

  constructor(readonly vcr: ViewContainerRef) { }

}