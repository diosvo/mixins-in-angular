import { Attribute, Component } from '@angular/core';
import { MessageType } from '@lib/services/snackbar/snackbar.service';


@Component({
  selector: 'alert-message',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  constructor(
    @Attribute('type') public type: MessageType
  ) { }
}
