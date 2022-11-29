import { ChangeDetectionStrategy, Component } from '@angular/core';

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
] as const;

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  protected selected: number;
  protected navList = navList;

  private sizes = {
    listItemWidth: 0,
    translateX: 0
  };

  get animate(): { width: string, transform: string } {
    return {
      width: `${this.sizes.listItemWidth}px`,
      transform: `translateX(${this.sizes.translateX}px)`
    };
  }

  onSelect(element: HTMLElement, index: number): void {
    const width = element.getBoundingClientRect().width;
    this.selected = index;

    this.sizes = {
      listItemWidth: width,
      translateX: width * this.selected
    };
  }
}
