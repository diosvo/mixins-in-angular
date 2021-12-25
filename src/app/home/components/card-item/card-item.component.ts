import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IBaseValue, IGroupValue } from '../../models/search.model';

@Component({
  selector: 'card-item',
  styleUrls: ['./card-item.component.scss'],
  templateUrl: './card-item.component.html',
})
export class CardItemComponent {
  @Input() data: Array<IGroupValue>;

  constructor(
    private readonly router: Router
  ) { }

  directItem(groupUrl: string, groupName: string, itemRoute: string): void {
    this.router.navigate([groupUrl, groupName.toLowerCase(), itemRoute]);
  }

  trackByItemName(_: number, item: IBaseValue): string {
    return item.name;
  }
}
