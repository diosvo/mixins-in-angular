import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EUrl } from '@home/models/url.enum';

const routes: Routes = [
  {
    path: '', redirectTo: EUrl.COMPONENT, pathMatch: 'full',
  },
  {
    path: EUrl.COMPONENT,
    loadChildren: () => import('./components-ui/components-ui-routing.module').then(({ COMPONENT_ROUTES }) => COMPONENT_ROUTES)
  },
  {
    path: EUrl.FUNCTION,
    loadChildren: () => import('./functions/functions.module').then(({ FunctionsModule }) => FunctionsModule)
  },
  {
    path: '**',
    loadChildren: () => import('./home/components/page-not-found/page-not-found.module').then(({ PageNotFoundModule }) => PageNotFoundModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
