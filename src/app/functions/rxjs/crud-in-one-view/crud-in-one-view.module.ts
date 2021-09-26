import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmDialogModule } from '@lib/components/confirm-dialog/confirm-dialog.module';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
import { UnsavedChangesGuard } from '@lib/guards/unsaved-changes.guard';
import { CrudInOneViewComponent } from './crud-in-one-view.component';

const routes: Routes = [
  {
    path: '',
    component: CrudInOneViewComponent,
    canDeactivate: [UnsavedChangesGuard],
    data: {
      title: 'CRUD in One View'
    }
  }
];

@NgModule({
  declarations: [CrudInOneViewComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CustomInputModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CrudInOneViewModule { }
