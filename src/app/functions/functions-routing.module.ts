import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EFunctions } from '../home/models/url.enum';

const routes: Routes = [
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
