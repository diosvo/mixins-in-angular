import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { CustomTableComponent } from './components/table/custom-table.component';

@NgModule({
  declarations: [CustomTableComponent, ActionButtonsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule
  ],
  exports: [CustomTableComponent],
})
export class CustomTableModule { }
