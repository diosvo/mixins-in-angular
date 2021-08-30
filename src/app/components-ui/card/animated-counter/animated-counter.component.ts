import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { of } from 'rxjs';

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
    color: 'lightpurple',
    amount: 69,
    percent: 99,
    icon: 'icon-shop',
  },
  {
    title: 'Total Views',
    color: 'lightgrey',
    amount: 12.12,
    percent: 69.96,
    icon: 'icon-shopping-cart',
  },
  {
    title: 'Conversation Rate',
    color: 'lightgreen',
    amount: 269,
    percent: 12.7,
    icon: 'icon-bar-graph',
  },
  {
    title: 'Avg Orders',
    color: 'lightorange',
    amount: 321,
    percent: 12.9,
    icon: 'icon-calendar',
  },
];

@Component({
  selector: 'app-animated-counter',
  templateUrl: './animated-counter.component.html',
  styleUrls: ['./animated-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AnimatedCounterComponent implements AfterViewInit {
  animatedCardList = of(data);

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
