import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from '../library/components/confirm-dialog/confirm-dialog.module';
import { FooterComponent } from './components/footer/footer.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    FooterComponent,
    ToolbarComponent,
    MenuItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    ConfirmDialogModule
  ],
  providers: [FormBuilder], 
  exports: [
    FooterComponent,
    ToolbarComponent,
    MenuItemComponent
  ]
})
export class HomeModule { }
