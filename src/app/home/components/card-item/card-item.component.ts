import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardItem } from '@home/services/search.service';
import { Required } from '@lib/decorators/required-attribute';

@Component({
  selector: 'card-item',
  styleUrls: ['./card-item.component.scss'],
  templateUrl: './card-item.component.html',
})
export class CardItemComponent {
  @Input() @Required data: CardItem[];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  directItem(group_id: string, routing_path: string): void {
    this.router.navigate([group_id.toLowerCase(), routing_path], {
      relativeTo: this.route
    });
  }
}
