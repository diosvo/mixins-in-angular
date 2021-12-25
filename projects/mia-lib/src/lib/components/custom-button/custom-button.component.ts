import { Component, Input } from '@angular/core';

type ButtonType = 'primary' | 'secondary' | 'text' | 'icon';
type ButtonComponentType = typeof PrimaryButtonComponent | typeof IconButtonComponent;

// Missing features:
// secondary | text button
// disabled state

@Component({
  selector: 'custom-button',
  templateUrl: './custom-button.component.html'
})
export class CustomButtonComponent {
  @Input() type: ButtonType = 'primary';

  get buttonComponentType(): ButtonComponentType {
    switch (this.type) {
      case 'primary':
        return PrimaryButtonComponent;
      case 'icon':
        return IconButtonComponent;
      case 'text':
        return TextButtonComponent;
    }
  }
}

@Component({
  selector: 'primary-button',
  template: `
    <button mat-flat-button [color]="'primary'">
        <ng-content></ng-content>
    </button>
  `
})
export class PrimaryButtonComponent { }

@Component({
  selector: 'icon-button',
  template: `
    <button mat-icon-button>
      <mat-icon class="text-secondary f-16"><ng-content></ng-content></mat-icon>
    </button>
  `
})
export class IconButtonComponent { }

@Component({
  selector: 'text-button',
  styleUrls: ['./custom-button.component.scss'],
  template: `
    <button class="button-text" mat-button>
      <ng-content></ng-content>
    </button>
  `
})
export class TextButtonComponent { }