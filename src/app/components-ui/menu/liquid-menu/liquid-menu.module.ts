import { NgModule } from '@angular/core';
import { LiquidMenuRoutingModule } from './liquid-menu-routing.module';
import { LiquidMenuComponent } from './liquid-menu.component';

@NgModule({
  declarations: [LiquidMenuComponent],
  imports: [
    LiquidMenuRoutingModule
  ]
})
export class LiquidMenuModule { }
