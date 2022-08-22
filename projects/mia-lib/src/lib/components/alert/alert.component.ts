import { CommonModule } from '@angular/common';
import { Attribute, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MessageType } from '@lib/services/snackbar/snackbar.service';

@Component({
  selector: 'alert-message',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  constructor(
    @Attribute('type') readonly type: MessageType
  ) { }

}
