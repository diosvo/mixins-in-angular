import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true
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
