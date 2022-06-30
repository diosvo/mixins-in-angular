import { Directive, HostListener, Input, NgModule } from '@angular/core';
import { Required } from '../decorators/required-attribute';

@Directive({
  selector: '[prevent-keys]'
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

@NgModule({
  declarations: [PreventKeysDirective],
  exports: [PreventKeysDirective]
})
export class PreventKeysDirectiveModule { }

/** 
 * @usage [prevent-keys]="['-']"
 */