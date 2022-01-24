import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'data-composition-ng-conf',
    loadChildren: () => import('./data-composition-ng-conf/data-composition-ng-conf.module').then(({ DataCompositionNgConfModule }) => DataCompositionNgConfModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RxjsRoutingModule { }
