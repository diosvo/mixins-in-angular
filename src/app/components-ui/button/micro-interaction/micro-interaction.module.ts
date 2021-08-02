import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MicroInteractionRoutingModule } from './micro-interaction-routing.module';
import { MicroInteractionComponent } from './micro-interaction.component';

@NgModule({
  declarations: [MicroInteractionComponent],
  imports: [
    CommonModule,
    MicroInteractionRoutingModule
  ]
})
export class MicroInteractionModule { }
