import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpdateComponent } from './update.component';

@NgModule({
  declarations: [UpdateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: UpdateComponent }])
  ]
})
export class UpdateModule { }
