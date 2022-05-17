import { Student } from './../../../students/student';
import { HomeService } from './../../home.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-students',
  templateUrl: './card-students.component.html',
  styleUrls: ['./card-students.component.scss'],
})
export class CardStudentsComponent implements OnInit {
  studentList: Student[];

  constructor(private service: HomeService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') == null) {
      this.router.navigate(['/']);
    }
    this.getAllStudents();
  }

  getAllStudents() {
    this.service.GetStudentsList().subscribe(
      (res) => {
        this.studentList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
