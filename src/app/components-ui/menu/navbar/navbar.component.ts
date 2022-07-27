import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

const navList = [
  {
    title: 'Home',
    icon: 'icon-home',
  },
  {
    title: 'Search',
    icon: 'icon-magnifying-glass',
  },
  {
    title: 'Like',
    icon: 'icon-heart-outlined',
  },
  {
    title: 'Profile',
    icon: 'icon-user',
  },
];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  selected: number;

  private sizes = {
    listItemWidth: 0,
    translateX: 0
  };

  public navList = navList;

  get animate(): any {
    return {
      width: this.sizes.listItemWidth + 'px',
      transform: `translateX(${this.sizes.translateX}px)`
    };
  }

  private updateSizes(element: HTMLElement, index = 1): void {
    this.sizes = {
      listItemWidth: element.getBoundingClientRect().width,
      translateX: element.getBoundingClientRect().width * index
    };
  }

  onSelect(element: HTMLElement, idx: number): void {
    this.selected = idx;
    this.updateSizes(element, idx);
  }
}
