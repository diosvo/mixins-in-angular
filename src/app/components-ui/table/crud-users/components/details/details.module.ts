import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
import { DetailsComponent } from './details.component';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CustomInputModule,
    ReactiveFormsModule
  ],
  exports: [DetailsComponent],
})
export class DetailsModule { }
