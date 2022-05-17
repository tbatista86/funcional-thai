import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { MaterialModule } from '../shared/material.module';
import { AddClassComponent } from './add-class/add-class.component';
import { ClassComponent } from './class.component';
import { ClassRoutingModule } from './class.routing.module';
import { EditClassComponent } from './edit-class/edit-class.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ClassComponent, AddClassComponent, EditClassComponent],
  imports: [
    CommonModule,
    ClassRoutingModule,
    MaterialModule,
    MatDialogModule,
    MatTableModule,
    SharedModule,
  ],
})
export class ClassModule {}
