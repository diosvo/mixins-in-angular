import { Component, ContentChild, ContentChildren, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { merge, Observable, switchMap } from 'rxjs';
import { AutocompleteContentDirective } from '../../utils/autocomplete-content.directive';
import { SelectOptionComponent } from '../select-option/select-option.component';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  exportAs: 'appAutocomplete'
})
export class AutocompleteComponent {

  // keep ng-template's instantiation lazy, it won't be created until we need it.
  @ViewChild('root') readonly rootTemplate: TemplateRef<unknown>;

  // expose a ref to its TemplateRef, so its parent (AutocompleteComponent) can query and render it on demand.
  @ContentChild(AutocompleteContentDirective) readonly content: AutocompleteContentDirective;

  @ContentChildren(SelectOptionComponent) options: QueryList<SelectOptionComponent>;

  optionsClick(): Observable<string> {
    return this.options.changes.pipe(
      switchMap((options: Array<{ click$: Observable<string> }>) => {
        const click$ = options.map(({ click$ }) => click$);
        return merge(...click$);
      })
    );
  }
}
