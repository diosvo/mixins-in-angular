import { Directive, ElementRef, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[loader]',
  standalone: true
})
export class ButtonLoaderIconDirective {

  constructor(readonly template: TemplateRef<ElementRef>) { }

}