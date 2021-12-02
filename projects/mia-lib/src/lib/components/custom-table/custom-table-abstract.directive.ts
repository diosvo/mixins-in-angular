import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'custom-column'
})

export class TableColumnDirective {

  @Input() columnName: string;
  @ContentChild(TemplateRef) public columnTemplate: TemplateRef<any>;
}