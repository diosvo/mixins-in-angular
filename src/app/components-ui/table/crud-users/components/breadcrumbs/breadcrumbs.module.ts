import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbsComponent } from './breadcrumbs.component';

@NgModule({
  declarations: [BreadcrumbsComponent],
  imports: [CommonModule],
  exports: [BreadcrumbsComponent]
})
export class BreadcrumbsModule { }
