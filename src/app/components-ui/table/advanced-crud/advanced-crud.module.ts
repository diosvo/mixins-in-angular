import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { AdvancedCrudRoutingModule } from './advanced-crud-routing.module';
import { AdvancedCrudComponent } from './components/advanced-crud/advanced-crud.component';

@NgModule({
  declarations: [AdvancedCrudComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomInputComponent,
    AdvancedCrudRoutingModule,

    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatProgressBarModule
  ]
})
export class AdvancedCrudModule { }
