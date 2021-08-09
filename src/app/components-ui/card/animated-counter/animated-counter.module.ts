import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnimatedCounterRoutingModule } from './animated-counter-routing.module';
import { AnimatedCounterComponent } from './animated-counter.component';
import { AnimatedCounterDirective } from './animated-counter.directive';

@NgModule({
  declarations: [AnimatedCounterComponent, AnimatedCounterDirective],
  imports: [
    CommonModule,
    AnimatedCounterRoutingModule
  ]
})
export class AnimatedCounterModule { }
