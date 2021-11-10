import { Component, Output } from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent {
  @Output() clicked = new EventEmitter();
}
