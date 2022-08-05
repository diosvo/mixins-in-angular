import { ContentChild, Directive, ElementRef, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'custom-column',
  standalone: true
})

export class TableColumnDirective {

  @Input() columnName: string;
  @ContentChild(TemplateRef) public columnTemplate: TemplateRef<ElementRef>;
}