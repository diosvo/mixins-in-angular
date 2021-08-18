import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertModule } from '@lib/components/alert/alert.module';
import { ContentComponent } from './components/content/content.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DataCompositionNgConfRoutingModule } from './data-composition-ng-conf-routing.module';

@NgModule({
  declarations: [
    MainPageComponent,
    SidebarComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    DataCompositionNgConfRoutingModule,
    AlertModule,

    MatListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class DataCompositionNgConfModule { }
