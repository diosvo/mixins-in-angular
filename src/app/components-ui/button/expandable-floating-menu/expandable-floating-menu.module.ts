import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ExpandableFloatingMenuRoutingModule } from './expandable-floating-menu-routing.module';
import { ExpandableFloatingMenuComponent } from './expandable-floating-menu.component';

@NgModule({
  declarations: [ExpandableFloatingMenuComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ExpandableFloatingMenuRoutingModule
  ]
})
export class ExpandableFloatingMenuModule { }
