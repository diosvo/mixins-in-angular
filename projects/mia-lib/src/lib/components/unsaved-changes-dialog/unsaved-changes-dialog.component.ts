import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-unsaved-changes-dialog',
  templateUrl: './unsaved-changes-dialog.component.html',
  styles: [`
    .dialog-actions {
      padding: 0.5rem 0 1rem;
    }
  `]
})

export class UnsavedChangesDialogComponent implements OnDestroy {
  subject = new Subject<boolean>();

  constructor(private dialog: MatDialog) {}

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

  onClose(): void {
    return this.dialog.closeAll();
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }
}
