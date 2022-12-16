import { NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { CardItem } from '@home/services/search.service';
import { Required } from '@lib/decorators/required-attribute';
import { HighlightDirective } from '@lib/directives/highlight.directive';
import { TrackByKeyDirective } from '@lib/directives/track-by-key.directive';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';

@Component({
  selector: 'card-item',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    TitleCasePipe,

    HighlightDirective,
    TrackByKeyDirective
  ],
  styleUrls: ['./card-item.component.scss'],
  templateUrl: './card-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardItemComponent {

  readonly prod_mode = environment.production;

  @Input() @Required data: CardItem[];
  @Input() searchTerm: string;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly snackbar: SnackbarService,
  ) { }

  directItem(item: CardItem): void {
    if (item.is_maintained && this.prod_mode) {
      return this.snackbar.error('The site is currently down for maintenance');
    }
    this.router.navigate([item.group_id.toLowerCase(), item.routing_path], {
      relativeTo: this.route
    });
  }
}
