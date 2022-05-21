import { Directive, ElementRef, EventEmitter, HostListener, NgModule, Output } from '@angular/core';

@Directive({
  selector: '[click-outside]'
})
export class ClickOutsideDirective {

  @Output() readonly clickOutside = new EventEmitter<MouseEvent>();

  constructor(private readonly elementRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (target && !this.elementRef.nativeElement.contains(target)) {
      this.clickOutside.emit(event);
    }
    throw new Error('Some errors occurred.');
  }
}

@NgModule({
  declarations: [ClickOutsideDirective],
  exports: [ClickOutsideDirective]
})
export class ClickOutsideDirectiveModule { }

/** 
 * @usage [click-outside]"
 */