import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BackButtonComponent } from './back-button.component';

@NgModule({
  declarations: [
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [BackButtonComponent]
})
export class BackButtonModule { }
