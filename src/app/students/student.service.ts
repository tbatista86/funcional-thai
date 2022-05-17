import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Student } from './student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private db: AngularFirestore) {}

  // Create Student
  AddStudent(student: Student) {
    student.id = this.db.createId();
    return this.db.collection('Students').add(student);
  }
  // Fetch Single Student Object
  GetStudent(id: string) {
    return this.db.collection('Students').doc(id).snapshotChanges();
  }
  // Fetch Students List
  GetStudentsList() {
    return this.db.collection('/Students').snapshotChanges();
  }
  // Update Student Object
  UpdateStudent(student: Student, id: string) {
    this.DeleteStudent(id);
    this.AddStudent(student);
  }
  // Delete Student Object
  DeleteStudent(id: string) {
    return this.db.doc(`Students/${id}`).delete();
  }
}
