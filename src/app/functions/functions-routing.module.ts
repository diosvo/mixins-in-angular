import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EFunctions } from '../home/models/url.enum';
import { ListFunctionsComponent } from './list-functions.component';

const routes: Routes = [
  {
    path: '',
    component: ListFunctionsComponent
  },
  {
    path: EFunctions.RXJS,
    loadChildren: () => import('./rxjs/rxjs.module').then(m => m.RxjsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunctionsRoutingModule { }
