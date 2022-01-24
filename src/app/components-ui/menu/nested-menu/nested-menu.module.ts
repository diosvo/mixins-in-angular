import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Routes } from '@angular/router';
import { NestedMenuComponent } from './components/nested-menu/nested-menu.component';

const routes: Routes = [
  {
    path: '',
    component: NestedMenuComponent,
    data: {
      title: 'Nested Menu'
    }
  }
];

@NgModule({
  declarations: [NestedMenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    MatMenuModule,
    MatButtonModule
  ]
})
export class NestedMenuModule { }
