import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrackByKeyDirective } from '@lib/directives/track-by-key.directive';
import { CardItemComponent } from './card-item.component';

@NgModule({
  declarations: [CardItemComponent],
  imports: [CommonModule, TrackByKeyDirective],
  exports: [CardItemComponent]
})
export class CardItemModule { }
