import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    data: { title: 'Data Composition w/ RxJS' }
  },
  {
    path: ':id',
    component: MainPageComponent,
    data: { title: 'Data Composition w/ RxJS - Product Details' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataCompositionNgConfRoutingModule { }
