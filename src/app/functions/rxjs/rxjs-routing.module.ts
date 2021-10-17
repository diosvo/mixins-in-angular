import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'data-composition-ng-conf',
    loadChildren: () => import('./data-composition-ng-conf/data-composition-ng-conf.module').then(m => m.DataCompositionNgConfModule)
  },
  {
    path: 'crud-in-one-view',
    loadChildren: () => import('./crud-in-one-view/crud-in-one-view.module').then(m => m.CrudInOneViewModule)
  },
  {
    path: 'basic-operators',
    loadChildren: () => import('./basic-operators/basic-operators.module').then(m => m.BasicOperatorsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RxjsRoutingModule { }
