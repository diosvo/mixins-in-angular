import { NgModule } from '@angular/core';
import { AlertModule } from './alert/alert.module';
import { BackButtonModule } from './back-button/back-button.module';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';

@NgModule({
  imports: [
    AlertModule,
    BackButtonModule,
    ConfirmDialogModule,
  ]
})
export class ComponentsLibModule { }
