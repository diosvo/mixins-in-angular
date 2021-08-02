import { Component } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-liquid-menu',
  templateUrl: './liquid-menu.component.html',
  styleUrls: ['./liquid-menu.component.scss']
})
export class LiquidMenuComponent {
  collapsed = false;
  init = false;

  onClick(menu: HTMLElement): void {
    const list = Array.prototype.slice.call(menu.children) as HTMLElement[];
    this.init = true;
    this.collapsed = !this.collapsed;

    gsap.to(menu, {
      translateY: 0,
      duration: 0.5
    });
    this.animationElement(this.collapsed, list);
  }

  private animationElement(collapsed: boolean, list: HTMLElement[]): void {
    if (collapsed) {
      for (let i = 0; i < list.length; i++) {
        const sliced = list.slice(i, list.length);
        gsap.to(sliced, {
          translateY: 50 * i,
          delay: 0.2 * i,
          duration: 0.6
        });
      }
    } else {
      gsap.to(list, {
        translateY: -80,
        duration: 0.3
      });
    }
  }
}
