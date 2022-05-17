import { ClassGroup } from './class-group';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  constructor(private db: AngularFirestore) {}

  AddStudentClass(group: ClassGroup, id: string) {
    return this.db.collection('/Class').doc(id).collection(id).add(group);
  }

  async AddClass() {
    let group: Object = {
      name: 'Remover',
      userId: this.db.createId(),
      date: new Date(),
    };
    this.db.collection('Class').add(group);
  }

  GetClass(id: string) {
    return this.db
      .collection('/Class')
      .doc(id)
      .collection(id)
      .snapshotChanges();
  }

  GetGroupList() {
    return this.db.collection('Class').snapshotChanges();
  }

  UpdateStudent(group: ClassGroup, id: string) {
    this.DeleteClass(id);
    this.AddStudentClass(group, id);
  }

  DeleteClass(id: string) {
    return this.db.doc(`Class/${id}`).delete();
  }

  DeleteStudentClass(id: string, studentId: string) {
    return this.db.doc(`Class/${id}/${id}/${studentId}`).delete();
  }

  GetStudentsList() {
    return this.db.collection('/Students').snapshotChanges();
  }

  GetStudent(id: string) {
    return this.db.collection('Students').doc(id).snapshotChanges();
  }
}
