import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnimatedCounterDirective } from 'src/app/components-ui/card/animated-counter/animated-counter.directive';
import { AnimatedCounterRoutingModule } from './animated-counter-routing.module';
import { AnimatedCounterComponent } from './animated-counter.component';

@NgModule({
  declarations: [AnimatedCounterComponent, AnimatedCounterDirective],
  imports: [
    CommonModule,
    AnimatedCounterRoutingModule
  ]
})
export class AnimatedCounterModule { }
