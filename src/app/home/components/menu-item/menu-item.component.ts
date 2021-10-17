import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IGroupValue } from '../../models/search.model';

@Component({
  selector: 'menu-item',
  styleUrls: ['./menu-item.component.scss'],
  templateUrl: './menu-item.component.html',
})
export class MenuItemComponent {
  @Input() data: Array<IGroupValue>;

  constructor(
    private router: Router
  ) { }

  async directItem(groupUrl: string, groupName: string, itemRoute: string): Promise<void> {
    await this.router.navigate([groupUrl, groupName.toLowerCase(), itemRoute]);
  }
}
