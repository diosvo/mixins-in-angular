import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appAutocompleteContent]'
})
export class AutocompleteContentDirective {

  constructor(readonly tpl: TemplateRef<unknown>) { }

}
