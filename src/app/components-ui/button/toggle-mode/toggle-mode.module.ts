import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BackButtonModule } from 'src/app/library/components/back-button/back-button.module';
import { ToggleModeRoutingModule } from './toggle-mode-routing.module';
import { ToggleModeComponent } from './toggle-mode.component';

@NgModule({
  declarations: [ToggleModeComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    BackButtonModule,
    ToggleModeRoutingModule
  ]
})
export class ToggleModeModule { }
