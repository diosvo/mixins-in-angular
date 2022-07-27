import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toggle-mode',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './toggle-mode.component.html',
  styleUrls: ['./toggle-mode.component.scss'],
})
export class ToggleModeComponent {

  isDarkTheme = true;

  switchTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }
}
