import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EUrl } from './home/models/url.enum';

const routes: Routes = [
  {
    path: '', redirectTo: EUrl.COMPONENT, pathMatch: 'full',
  },
  {
    path: EUrl.COMPONENT,
    loadChildren: () => import('./components-ui/components-ui.module').then(m => m.ComponentsUiModule)
  },
  {
    path: EUrl.FUNCTION,
    loadChildren: () => import('./functions/functions.module').then(m => m.FunctionsModule)
  },
  {
    path: '**',
    loadChildren: () => import('./home/components/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
