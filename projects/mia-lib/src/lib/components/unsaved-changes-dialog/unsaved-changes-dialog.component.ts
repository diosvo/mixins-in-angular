import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-unsaved-changes-dialog',
  templateUrl: './unsaved-changes-dialog.component.html',
  styles: [`
    .dialog-title {
      margin-bottom: 0.5rem;
    }

    .dialog-actions {
      padding: 0.5rem 0 1rem;
    }

    .close-button {
      margin: -1rem -1rem 0 0;
    }
  `]
})

export class UnsavedChangesDialogComponent implements OnDestroy {
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

  onDiscard(): void {
    this.subject.next(false);
    this.subject.complete();
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }
}
