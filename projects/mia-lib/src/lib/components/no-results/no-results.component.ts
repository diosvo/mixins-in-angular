import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'no-results',
  standalone: true,
  templateUrl: './no-results.component.html',
})
export class NoResultsComponent {
  @Output() readonly resetFilters = new EventEmitter<void>();
}