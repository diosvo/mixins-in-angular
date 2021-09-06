import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IGroupValue } from '../../models/search.model';

@Component({
  selector: 'menu-item',
  styleUrls: ['./menu-item.component.scss'],
  templateUrl: './menu-item.component.html',
})
export class MenuItemComponent {
  @Input() data: Observable<Array<IGroupValue>>;
  @Output() selectedChip = new EventEmitter<string>();

  emptyImg = 'assets/images/logo/placeholder-image.png';

  constructor(
    private router: Router
  ) { }

  async directItem(groupUrl: string, groupName: string, itemRoute: string): Promise<void> {
    await this.router.navigate([groupUrl, groupName.toLowerCase(), itemRoute]);
  }

  onSelect(groupName: string): void {
    this.selectedChip.emit(groupName);
  }
}
