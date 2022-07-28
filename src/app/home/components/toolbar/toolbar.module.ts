import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthModule } from '@auth/auth.module';
import { ConfirmDialogModule } from '@lib/components/confirm-dialog/confirm-dialog.module';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
import { TrackByKeyDirective } from '@lib/directives/track-by-key.directive';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,

    AuthModule,
    CustomButtonModule,
    ConfirmDialogModule,
    TrackByKeyDirective,

    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  exports: [ToolbarComponent],
})
export class ToolbarModule { }
