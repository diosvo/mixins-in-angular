import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appAutocompleteContent]',
  standalone: true
})
export class AutocompleteContentDirective {

  constructor(readonly tpl: TemplateRef<unknown>) { }

}
