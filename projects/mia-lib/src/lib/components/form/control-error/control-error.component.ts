import { animate, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import isEqual from 'lodash.isequal';

@Component({
  imports: [NgIf],
  standalone: true,
  template: '<p [@animation]="increment" *ngIf="message" [style.margin-top.rem]="-1" class="f-11 text-error">{{ message }}</p>',
  animations: [
    trigger('animation', [
      transition(':increment', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-1rem)' }),
        animate('200ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0, transform: 'translateY(-1rem)' }))
      ])
    ])
  ]
})
export class ControlErrorComponent {

  protected message: string;
  protected increment = 0;

  @Input() set error(value: string) {
    if (!isEqual(value, this.message)) {
      this.increment++;
    }
    this.message = value;
  }

}
