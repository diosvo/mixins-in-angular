import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { UnsavedChangesGuard } from '@lib/guards/unsaved-changes.guard';
import { DetailsComponent } from './details.component';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    CustomInputComponent,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: DetailsComponent,
      canDeactivate: [UnsavedChangesGuard],
      title: 'Details'
    }]),

    MatChipsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
})
export class DetailsModule { }
