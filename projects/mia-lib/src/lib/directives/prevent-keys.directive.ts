import { Directive, HostListener, Input } from '@angular/core';
import { Required } from '../decorators/required-attribute';

@Directive({
  selector: '[prevent-keys]',
  standalone: true
})
export class PreventKeysDirective {
  @Input('prevent-keys') @Required preventKeys: Array<string>;
  @HostListener('window:keydown', ['$event'])
  handleKeyDown($event: KeyboardEvent): void {
    if (this.preventKeys && this.preventKeys.includes($event.key)) {
      $event.preventDefault();
    }
  }
}

/** 
 * @usage [prevent-keys]="['-']"
 */