import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [MatButtonModule],
  exports: [FooterComponent]
})
export class FooterModule { }
