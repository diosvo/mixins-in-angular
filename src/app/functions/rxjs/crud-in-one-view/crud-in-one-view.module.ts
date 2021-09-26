import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CrudInOneViewRoutingModule } from './crud-in-one-view-routing.module';
import { CrudInOneViewComponent } from './crud-in-one-view.component';

@NgModule({
  declarations: [
    CrudInOneViewComponent
  ],
  imports: [
    CommonModule,
    CrudInOneViewRoutingModule
  ]
})
export class CrudInOneViewModule { }
