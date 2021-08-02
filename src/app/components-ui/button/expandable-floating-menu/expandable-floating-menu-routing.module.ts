import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpandableFloatingMenuComponent } from './expandable-floating-menu.component';

const routes: Routes = [
  {
    path: '',
    component: ExpandableFloatingMenuComponent,
    data: { title: 'Button Expandable Floating Menu' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpandableFloatingMenuRoutingModule { }
