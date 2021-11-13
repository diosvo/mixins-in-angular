import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent {
  @Output() clicked = new EventEmitter();
}
