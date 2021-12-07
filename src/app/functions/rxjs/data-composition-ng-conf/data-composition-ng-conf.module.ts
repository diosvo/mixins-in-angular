import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertModule } from '@lib/components/alert/alert.module';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
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
    AlertModule,
    CustomButtonModule,
    DataCompositionNgConfRoutingModule,

    MatProgressSpinnerModule
  ]
})
export class DataCompositionNgConfModule { }
