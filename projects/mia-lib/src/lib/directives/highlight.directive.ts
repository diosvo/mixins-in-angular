import { Directive, ElementRef, HostBinding, Input, OnChanges, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgChanges } from '@lib/helpers/mark-function-properties';
import isEmpty from 'lodash.isempty';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective implements OnChanges {

  @Input('highlight') searchTerm: string;
  @Input() caseSensitive = false;
  @Input() customClass = '';

  @HostBinding('innerHTML')
  content: string;

  constructor(
    private readonly el: ElementRef,
    private readonly sanitizer: DomSanitizer
  ) { }

  ngOnChanges(changes: NgChanges<HighlightDirective>): void {
    if (this.el && this.el.nativeElement) {
      if ('searchTerm' in changes || 'caseSensitive' in changes) {
        const text = (this.el.nativeElement as HTMLElement).textContent;

        if (isEmpty(this.searchTerm)) {
          this.content = text;
        } else {
          const regex = new RegExp(this.searchTerm, this.caseSensitive ? 'g' : 'gi');
          const newText = text.replace(regex, (match: string) => {
            return `<mark class="${this.customClass}">${match}</mark>`;
          });
          const sanitizer = this.sanitizer.sanitize(SecurityContext.HTML, newText);
          this.content = sanitizer;
        }
      }
    }
  }
}
