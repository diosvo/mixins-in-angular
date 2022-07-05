import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PageNotFoundComponent,
    title: 'Page Not Found',
    data: { toolbar: false, footer: false }
  }
];

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [PageNotFoundComponent]
})
export class PageNotFoundModule { }
