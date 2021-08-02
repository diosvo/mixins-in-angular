import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'liquid-menu',
    loadChildren: () => import('./liquid-menu/liquid-menu.module').then(m => m.LiquidMenuModule)
  },
  {
    path: 'navbar',
    loadChildren: () => import('./navbar/navbar.module').then(m => m.NavbarModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
