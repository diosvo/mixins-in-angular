import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsavedChangesGuard } from '@lib/guards/unsaved-changes.guard';
import { CrudInOneViewComponent } from './crud-in-one-view.component';

const routes: Routes = [
  {
    path: '',
    component: CrudInOneViewComponent,
    canDeactivate: [UnsavedChangesGuard],
    data: {
      title: 'CRUD in One View'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudInOneViewRoutingModule { }
