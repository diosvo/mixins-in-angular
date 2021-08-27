import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IGroupValue } from '../../models/search.model';

@Component({
  selector: 'menu-item',
  styleUrls: ['./menu-item.component.scss'],
  templateUrl: './menu-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent {
  @Input() data: Observable<Array<IGroupValue>>;

  emptyImg = 'assets/images/logo/placeholder-image.png';

  constructor(
    private router: Router
  ) { }

  directItem(groupUrl: string, groupName: string, itemRoute: string): void {
    this.router.navigate([groupUrl, groupName.toLowerCase(), itemRoute]);
  }
}
