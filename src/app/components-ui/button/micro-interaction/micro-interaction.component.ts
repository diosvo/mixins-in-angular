import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-micro-interaction',
  templateUrl: './micro-interaction.component.html',
  styleUrls: ['./micro-interaction.component.scss']
})

export class MicroInteractionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.mainFunction();
  }

  mainFunction(): void {
    const tl = gsap.timeline({
      defaults: {
        ease: 'easeOut'
      }
    });

    const label = document.querySelector('.label');
    const btn = document.querySelector('.button');
    const rule = document.querySelector('.button-shadow');
    const icon = document.querySelector('svg');
    const text = document.querySelector('p');

    // Set tl: timeline
    tl.to(label, {
      opacity: 0,
      height: 0,
      position: 'absolute',
      duration: '.2s'
    })

      .to(btn, {
        borderRadius: '50%',
        width: '2.5em',
        height: '2.5em',
        duration: .7
      }, '-=.5s')

      .to(rule, {
        borderRadius: '50%',
        width: '2.25em',
        height: '2.25em',
        autoAlpha: 1,
        display: 'block'
      }, '-=.5s')

      .to(icon, {
        display: 'block',
      }, '-=1s')

      // Change button icon
      .to('path', {
        attr: { d: 'm386.671 257.778-257.778 257.778v-128.886l128.889-128.892-128.897-128.886.008-128.892z' }
      }, '+=1')

      .to(text, {
        clipPath: 'circle(100% at 50% 50%)'
      }, '-=1.3')

      .pause();

    btn.addEventListener('click', () => {
      tl.play();
    });
  }

  onNext(): void {
    alert('No more action!');
  }
}
