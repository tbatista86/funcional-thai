import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private db: AngularFirestore) {}

  GetStudentsList() {
    return this.db.collection('/Students').snapshotChanges();
  }

  GetClassList() {
    return this.db.collection('/Class').snapshotChanges();
  }
}
