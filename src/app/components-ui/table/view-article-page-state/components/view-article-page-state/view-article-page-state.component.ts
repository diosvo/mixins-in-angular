import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AlertComponent } from '@lib/components/alert/alert.component';
import { CustomButtonComponent } from '@lib/components/custom-button/custom-button.component';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { TableColumnDirective } from '@lib/components/custom-table/custom-table-abstract.directive';
import { CustomTableComponent } from '@lib/components/custom-table/custom-table.component';
import { LineBreakPipe } from '@lib/pipes/line-break.pipe';

@Component({
  selector: 'app-view-article-page-state',
  standalone: true,
  imports: [
    CommonModule,

    AlertComponent,
    LineBreakPipe,
    CustomButtonComponent,
    CustomTableComponent,
    CustomInputComponent,
    TableColumnDirective,

    MatProgressBarModule
  ],
  templateUrl: './view-article-page-state.component.html',
})
export class ViewArticlePageStateComponent implements OnInit {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
