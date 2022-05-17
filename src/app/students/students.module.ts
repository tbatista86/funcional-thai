import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { StudentsComponent } from './students.component';
import { StudentsRoutingModule } from './students.routing.module';

@NgModule({
  declarations: [StudentsComponent, AddStudentComponent, EditStudentComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    MatDatepickerModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
})
export class StudentsModule {}
