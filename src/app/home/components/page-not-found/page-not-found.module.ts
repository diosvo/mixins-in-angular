import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PageNotFoundComponent,
    data: { title: 'Page Not Found', toolbar: false, footer: false }
  }
];

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [PageNotFoundComponent]
})
export class PageNotFoundModule { }
