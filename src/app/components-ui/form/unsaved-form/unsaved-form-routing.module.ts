import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsavedChangesGuard } from '@lib/guards/unsaved-changes.guard';
import { UnsavedFormComponent } from './components/unsaved-form/unsaved-form.component';

const routes: Routes = [
  {
    path: '',
    component: UnsavedFormComponent,
    canDeactivate: [UnsavedChangesGuard],
    data: {
      role: ['Customer'],
      title: 'Unsaved Form Demo',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnsavedFormRoutingModule { }
