import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EFunctions } from '../home/models/url.enum';
import { ListFunctionsComponent } from './list-functions.component';

const routes: Routes = [
  {
    path: '',
    component: ListFunctionsComponent,
    data: { title: 'Functions' }
  },
  {
    path: EFunctions.RXJS,
    loadChildren: () => import('./rxjs/rxjs.module').then(({ RxjsModule }) => RxjsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunctionsRoutingModule { }
