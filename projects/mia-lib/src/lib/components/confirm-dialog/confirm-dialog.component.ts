import { NgIf, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface IDialog {
  title: string;
  content: string;
  details: unknown;
  template: TemplateRef<ElementRef>;
}

export type Dialog = Required<Pick<IDialog, 'title'>> & Partial<Omit<IDialog, 'title'>>

@Component({
  selector: 'confirm-dialog',
  standalone: true,
  imports: [
    NgIf,
    TitleCasePipe,
    NgTemplateOutlet,

    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: Dialog
  ) { }

}
