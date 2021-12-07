import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomButtonComponent, IconButtonComponent, PrimaryButtonComponent, TextButtonComponent } from './custom-button.component';

@NgModule({
  declarations: [
    TextButtonComponent,
    IconButtonComponent,
    CustomButtonComponent,
    PrimaryButtonComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [CustomButtonComponent],
})
export class CustomButtonModule { }
