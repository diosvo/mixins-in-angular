import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardItem } from '@home/services/search.service';
import { Required } from '@lib/decorators/required-attribute';
import { HighlightDirective } from '@lib/directives/highlight.directive';
import { TrackByKeyDirective } from '@lib/directives/track-by-key.directive';

@Component({
  selector: 'card-item',
  standalone: true,
  imports: [
    CommonModule,
    HighlightDirective,
    TrackByKeyDirective
  ],
  styleUrls: ['./card-item.component.scss'],
  templateUrl: './card-item.component.html',
})
export class CardItemComponent {

  @Input() @Required data: CardItem[];
  @Input() searchTerm: string;

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
