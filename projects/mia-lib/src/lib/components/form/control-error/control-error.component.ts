import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import isEqual from 'lodash.isequal';

@Component({
  template: '<span class="f-12 text-error" [class.d-none]="hide">{{ _text }}</span>',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {

  protected _text: string;
  protected hide: boolean;

  @Input() set text(value: string) {
    if (!isEqual(value, this._text)) {
      this._text = value;
      this.hide = !value;
      this.cdr.detectChanges();
    }
  }

  constructor(private readonly cdr: ChangeDetectorRef) { }

}
