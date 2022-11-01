import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'img',
  standalone: true,
  exportAs: 'lazyImg'
})
export class LazyImageDirective {

  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }

}