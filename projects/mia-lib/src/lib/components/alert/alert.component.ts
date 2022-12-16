import { NgSwitch, NgSwitchCase } from '@angular/common';
import { Attribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MessageType } from '@lib/services/snackbar/snackbar.service';

@Component({
  selector: 'alert-message',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase
  ],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {

  @Input() hasBorder = true;

  constructor(
    @Attribute('type') readonly type: MessageType
  ) { }

}
