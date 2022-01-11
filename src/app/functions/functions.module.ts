import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardItemModule } from '@home/components/card-item/card-item.component.module';
import { AlertModule } from '@lib/components/alert/alert.module';
import { FunctionsRoutingModule } from './functions-routing.module';
import { ListFunctionsComponent } from './list-functions.component';

@NgModule({
  declarations: [ListFunctionsComponent],
  imports: [
    CommonModule,
    FunctionsRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    AlertModule,
    CardItemModule,

    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatProgressBarModule
  ]
})
export class FunctionsModule { }
