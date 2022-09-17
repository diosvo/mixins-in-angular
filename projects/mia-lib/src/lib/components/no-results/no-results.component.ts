import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'no-results',
  standalone: true,
  templateUrl: './no-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoResultsComponent {
  @Output() readonly resetFilters = new EventEmitter<void>();
}