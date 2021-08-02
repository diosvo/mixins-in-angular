import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Expo, gsap } from 'gsap';

interface MenuModel {
  menuTitle: string;
  menuLink?: string;
  menuImageUrl?: string;
}

const menuDataList: MenuModel[] = [
  {
    menuTitle: 'Laptop',
    menuImageUrl: 'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    menuTitle: 'Flowers',
    menuImageUrl: 'https://images.unsplash.com/photo-1612733021445-b258ad12a5dd?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
  },
  {
    menuTitle: 'Cake',
    menuImageUrl: 'https://images.unsplash.com/photo-1612724880140-e7456ea477b6?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3OXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
  },
  {
    menuTitle: 'Eagle',
    menuImageUrl: 'https://images.unsplash.com/photo-1612723652267-7565bb0ac539?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
  },
  {
    menuTitle: 'Coffee',
    menuImageUrl: 'https://images.unsplash.com/photo-1612714401296-87a1768bd741?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80',
  },
];

type MenuPosition = 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft';

@Component({
  selector: 'app-expandable-floating-menu',
  templateUrl: './expandable-floating-menu.component.html',
  styleUrls: ['./expandable-floating-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExpandableFloatingMenuComponent implements OnInit {
  @Input() menuData = menuDataList;
  @Input() menuPosition: MenuPosition = 'bottomRight';
  @Input() disabled: boolean;

  @Output() menuSelect = new EventEmitter<MenuModel>();

  @ViewChild('menu', { static: true }) menu: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.setMenuPosition();
  }

  showMenu(menu: HTMLDivElement, btn: HTMLButtonElement, overlay: HTMLDivElement): void {
    gsap.to(overlay, {
      duration: 0,
      autoAlpha: 1
    });

    gsap.to(btn, {
      x: this.translatePosition.positionX,
      y: this.translatePosition.positionY,

      duration: 0.3,
      autoAlpha: 0,

      scale: 1.6,
      ease: Expo.easeInOut as any
    });

    gsap.to(menu, {
      x: -10,
      y: -10,

      width: 200,
      height: 'auto',

      scale: 1,
      duration: 0.4,

      autoAlpha: 1,
      ease: Expo.easeInOut as any
    });

    gsap.from(menu.children, {
      delay: 0.1,
      autoAlpha: 0,
      ease: Expo.easeInOut as any
    });
  }

  setStyles(): any {
    return {
      opacity: this.disabled ? 0.3 : 1,
      cursor: this.disabled ? 'default' : 'pointer'
    };
  }

  setMenuPosition(): void {
    const menu = this.menu.nativeElement as HTMLDivElement;

    switch (this.menuPosition) {
      case 'topLeft':
        menu.style.top = '10%';
        menu.style.left = '35%';
        return;
      case 'bottomLeft':
        menu.style.left = '35%';
        return;
      case 'topRight':
        menu.style.top = '10%';
        menu.style.right = '0';
        return;
      case 'bottomRight':
        menu.style.right = '0';
        return;
      default:
        return;
    }
  }

  get translatePosition(): { positionX: number, positionY: number } {
    switch (this.menuPosition) {
      case 'topLeft':
        return { positionX: -20, positionY: -20 };
      case 'topRight':
        return { positionX: 10, positionY: -20 };
      case 'bottomLeft':
        return { positionX: -20, positionY: 20 };
      case 'bottomRight':
        return { positionX: 10, positionY: 10 };
      default:
        return;
    }
  }

  closeMenu(menu: HTMLDivElement, btn: HTMLButtonElement, overlay: HTMLDivElement): void {
    gsap.to(overlay, {
      duration: 0,
      autoAlpha: 0
    });

    gsap.to(btn, {
      x: 0,
      y: 0,

      duration: 0.4,
      autoAlpha: 1,

      scale: 1,
      ease: Expo.easeInOut as any
    });

    gsap.to(menu, {
      x: -10,
      y: -10,
      width: 0,
      height: 0,

      duration: 0.3,
      autoAlpha: 0,

      scale: 0.4,
      ease: Expo.easeInOut as any
    });

    gsap.from(menu.children, {
      duration: 0,
      autoAlpha: 1,
      ease: Expo.easeInOut as any
    });
  }

  selectItem = (menu: MenuModel) => this.menuSelect.emit(menu);
}
