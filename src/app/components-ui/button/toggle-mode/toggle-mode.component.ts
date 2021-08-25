import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-toggle-mode',
  templateUrl: './toggle-mode.component.html',
  styleUrls: ['./toggle-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleModeComponent {
  isDarkTheme = true;

  constructor() { }

  switchTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }
}
