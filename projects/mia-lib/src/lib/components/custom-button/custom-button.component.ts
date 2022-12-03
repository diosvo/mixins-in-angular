import { NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import { Attribute, ChangeDetectionStrategy, Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ButtonLoaderIconDirective } from './button-loader-icon.directive';

type ButtonType = 'basic' | 'flat' | 'outline' | 'icon';

@Component({
  selector: 'custom-button',
  templateUrl: './custom-button.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgTemplateOutlet,
    ButtonLoaderIconDirective,

    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomButtonComponent {

  @Input() disabled = false;
  @Input() loading = false;
  @Input() iconClass: string;
  @Input() buttonClass: string;
  @Input() tooltip = '';

  @ContentChild(ButtonLoaderIconDirective)
  protected readonly icon: ButtonLoaderIconDirective;

  constructor(
    @Attribute('variant') readonly variant: ButtonType
  ) { }
}
