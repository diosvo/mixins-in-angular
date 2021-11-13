import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ToggleModeRoutingModule } from './toggle-mode-routing.module';
import { ToggleModeComponent } from './toggle-mode.component';

@NgModule({
  declarations: [ToggleModeComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ToggleModeRoutingModule
  ]
})
export class ToggleModeModule { }
