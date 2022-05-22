import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrackByKeyDirectiveModule } from '@lib/directives/track-by-key.directive';
import { CardItemComponent } from './card-item.component';

@NgModule({
  declarations: [CardItemComponent],
  imports: [CommonModule, TrackByKeyDirectiveModule],
  exports: [CardItemComponent]
})
export class CardItemModule { }
