import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'navbar',
    loadChildren: () => import('./navbar/navbar.module').then(({ NavbarModule }) => NavbarModule)
  },
  {
    path: 'nested-menu',
    loadChildren: () => import('./nested-menu/nested-menu.module').then(({ NestedMenuModule }) => NestedMenuModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
