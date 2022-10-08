import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { of } from 'rxjs';
import { AnimatedCounterDirective } from './animated-counter.directive';

interface AnimatedCounterModel {
  title: string;
  color: string;
  amount: number;
  percent: number;
  icon: string;
}

const data: AnimatedCounterModel[] = [
  {
    title: 'Total Orders',
    color: 'support-01',
    amount: 69,
    percent: 99,
    icon: 'icon-shop',
  },
  {
    title: 'Total Views',
    color: 'support-09',
    amount: 12.12,
    percent: 69.96,
    icon: 'icon-shopping-cart',
  },
  {
    title: 'Conversation Rate',
    color: 'support-11',
    amount: 269,
    percent: 12.7,
    icon: 'icon-bar-graph',
  },
  {
    title: 'Avg Orders',
    color: 'support-15',
    amount: 321,
    percent: 12.9,
    icon: 'icon-calendar',
  },
];

@Component({
  selector: 'app-animated-counter',
  standalone: true,
  imports: [CommonModule, AnimatedCounterDirective],
  templateUrl: './animated-counter.component.html',
  styleUrls: ['./animated-counter.component.scss']
})

export class AnimatedCounterComponent implements AfterViewInit {
  readonly animatedCardList = of(data);

  @ViewChild('el', { static: false }) el: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    gsap.from(this.el.nativeElement.children, {
      delay: 1,
      autoAlpha: 0,
      y: -20,
      stagger: 0.10
    });
  }
}
