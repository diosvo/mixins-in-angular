import { Component, Input } from '@angular/core';
import { MessageType } from '../../models/alert';

@Component({
  selector: 'alert-message',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() type: MessageType;

  public dismissAlert(element): void {
    return element.parentElement.removeChild(element);
  }
}
