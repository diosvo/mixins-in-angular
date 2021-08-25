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
import { AuthModule } from '@auth/auth.module';
import { AlertModule } from '@lib/components/alert/alert.module';
import { MenuItemModule } from '../home/components/menu-item/menu-item.module';
import { FunctionsRoutingModule } from './functions-routing.module';
import { ListFunctionsComponent } from './list-functions.component';

@NgModule({
  declarations: [ListFunctionsComponent],
  imports: [
    CommonModule,
    FunctionsRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    AuthModule,   
    AlertModule,
    MenuItemModule,

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
