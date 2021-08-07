import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-unsaved-changes-dialog',
  templateUrl: './unsaved-changes-dialog.component.html'

})
export class UnsavedChangesDialogComponent {
  subject = new Subject<boolean>();

  /**
  * @description
  * true => onDiscard() => go somewhere on the web
  * false => onSave() => implements onSave() method
  */

  onSave(): void {
    this.subject.next(true);
    this.subject.complete();
  }
}
