import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
import { CrudInOneViewRoutingModule } from './crud-in-one-view-routing.module';
import { CrudInOneViewComponent } from './crud-in-one-view.component';

@NgModule({
  declarations: [CrudInOneViewComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CustomInputModule,
    ReactiveFormsModule,
    CrudInOneViewRoutingModule,
  ]
})
export class CrudInOneViewModule { }
