import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create.component';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CreateComponent }])
  ]
})
export class CreateModule { }
