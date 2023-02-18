import { NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import { Attribute, ChangeDetectionStrategy, Component, ContentChild, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { ButtonLoaderIconDirective } from './button-loader-icon.directive';

type ButtonVariant = 'basic' | 'raised' | 'flat' | 'icon' | 'stroked' | 'fab' | 'mini-fab';

@Component({
  selector: 'custom-button',
  templateUrl: './custom-button.component.html',
  standalone: true,
  imports: [
    /* @angular */
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgTemplateOutlet,
    /* @lib */
    ButtonLoaderIconDirective,
    /* @material */
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
  @Input() color: ThemePalette;

  @ContentChild(ButtonLoaderIconDirective)
  protected readonly icon: ButtonLoaderIconDirective;

  constructor(
    @Attribute('variant') readonly variant: ButtonVariant
  ) { }
}
