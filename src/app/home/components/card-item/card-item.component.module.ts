import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CardItemComponent } from './card-item.component.spec';

@NgModule({
  declarations: [CardItemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [CardItemComponent]
})
export class CardItemModule { }
