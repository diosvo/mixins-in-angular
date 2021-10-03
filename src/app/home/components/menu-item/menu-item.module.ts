import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MenuItemComponent } from './menu-item.component';

@NgModule({
  declarations: [MenuItemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [MenuItemComponent]
})
export class MenuItemModule { }
