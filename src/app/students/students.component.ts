import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { StudentService } from './student.service';
import { Student } from './student';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  @ViewChild('modal')
  modal: TemplateRef<any>;

  @ViewChild('modalDelete')
  modalDelete: TemplateRef<any>;

  displayedColumns: string[] = ['name', 'dueDate', 'phone', 'actions'];
  studentList: Student[] = [];
  dataSource = new MatTableDataSource<Student>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: StudentService,
    private router: Router,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

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
        this.dataSource = new MatTableDataSource<Student>(this.studentList);
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(student: Student) {
    this.router.navigate([`/edit-student/${student.id}`]);
  }

  verifyDueDate(dueDate: Date) {
    let currentDate: Date;
    currentDate = new Date();

    return (
      currentDate.getMonth() > dueDate.getMonth() ||
      currentDate.getFullYear() > dueDate.getFullYear()
    );
  }

  openDialog(dueDate: Date, student: Student) {
    if (this.verifyDueDate(dueDate)) {
      const dialogRef = this.dialog.open(this.modal);
      const currentDate: Date = new Date();
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          student.dueDate = currentDate;
          this.service.UpdateStudent(student, student.id);
          this.toastr.success(`Baixa do pagamento realizado com sucesso!`);
        }
      });
    }
  }

  openDialogDelete(student: Student) {
    const dialogRef = this.dialog.open(this.modalDelete);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.DeleteStudent(student.id);
        this.toastr.error(`Aluno(a) excluido com sucesso!`);
      }
    });
  }

  add() {
    this.router.navigate(['/register-student']);
  }
}
