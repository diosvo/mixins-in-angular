import { CommonModule } from '@angular/common';
import { Attribute, Component, ContentChild, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonLoaderIconDirective } from './button-loader-icon.directive';

type ButtonType = 'basic' | 'flat' | 'outline';

@Component({
  selector: 'custom-button',
  templateUrl: './custom-button.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ButtonLoaderIconDirective,

    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class CustomButtonComponent {

  @Input() disabled = false;
  @Input() loading = false;

  @ContentChild(ButtonLoaderIconDirective)
  protected readonly icon: ButtonLoaderIconDirective;

  constructor(
    @Attribute('variant') readonly variant: ButtonType = 'flat'
  ) { }
}

// 📌 : https://sreyaj.dev/creating-buttons-with-custom-loading-animations-in-angular-simple-and-easy