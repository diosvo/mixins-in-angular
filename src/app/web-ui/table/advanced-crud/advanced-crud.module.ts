import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BackButtonModule } from 'src/app/library/components/back-button/back-button.module';
import { AdvancedCrudRoutingModule } from './advanced-crud-routing.module';
import { AdvancedCrudComponent } from './components/advanced-crud/advanced-crud.component';

@NgModule({
  declarations: [
    AdvancedCrudComponent
  ],
  imports: [
    CommonModule,
    AdvancedCrudRoutingModule,
    BackButtonModule,

    FormsModule,
    ReactiveFormsModule,

    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatPaginatorModule
  ]
})
export class AdvancedCrudModule { }
