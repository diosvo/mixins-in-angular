import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListWebUiComponent } from './list-web-ui.component';
import { WebUiRoutingModule } from './web-ui-routing.module';

@NgModule({
  declarations: [ListWebUiComponent],
  imports: [
    CommonModule,
    WebUiRoutingModule
  ]
})
export class WebUiModule { }
