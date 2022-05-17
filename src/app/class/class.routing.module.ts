import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddClassComponent } from './add-class/add-class.component';
import { ClassComponent } from './class.component';
import { EditClassComponent } from './edit-class/edit-class.component';

const routes: Routes = [
  { path: '', redirectTo: '/view-class', pathMatch: 'full' },
  { path: 'register-class', component: AddClassComponent },
  { path: 'view-class', component: ClassComponent },
  { path: 'edit-class/:id', component: EditClassComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassRoutingModule {}
