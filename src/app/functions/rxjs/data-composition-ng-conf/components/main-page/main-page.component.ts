import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContentComponent } from '../content/content.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'data-composition-main-page',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    ContentComponent
  ],
  templateUrl: './main-page.component.html'
})
export class MainPageComponent { }
