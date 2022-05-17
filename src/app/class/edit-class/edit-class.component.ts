import { ClassGroup } from './../class-group';
import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/students/student';

import { ClassService } from '../class.service';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss'],
})
export class EditClassComponent implements OnInit {
  @ViewChild('modal')
  modal: TemplateRef<any>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  classId;
  classGroup: any[] = [];
  displayedColumns: string[] = ['name', 'actions'];

  studentList: Student[] = [];
  dataSource = new MatTableDataSource<Student>();

  dialogRef;

  constructor(
    private service: ClassService,
    private route: ActivatedRoute,
    public db: AngularFireDatabase,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) {
    this.route.params.subscribe((params) => (this.classId = params['id']));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getClass(this.classId);
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

  getClass(id: string) {
    this.service.GetClass(id).subscribe(
      (res) => {
        res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          this.classGroup.push(data);

          return data;
        });
      },
      (err) => {
        console.error(err);
      }
    );
  }

  openDialog() {
    this.dialogRef = this.dialog.open(this.modal);
    this.dialogRef.afterClosed().subscribe();
  }

  verifyStudentInClass(student: Student): boolean {
    let verify = this.classGroup.filter((e) => e.userId === student.id);

    return verify.length === 0 ? false : true;
  }

  async add(student: Student) {
    if (this.verifyStudentInClass(student)) {
      this.toastr.info(`${student.name} já está adicionado na turma!`);
      return;
    }

    const classGroup = {
      name: student.name,
      userId: student.id,
    };

    await this.service.AddStudentClass(classGroup, this.classId);
    this.toastr.success(`${student.name} adicionado na turma com sucesso!`);
    this.dialogRef.close();
    this.classGroup.length = 0;
  }

  async remove(item: ClassGroup) {
    if (confirm('Deseja remover o aluno(a) da Turma')) {
      await this.service.DeleteStudentClass(this.classId, item.id);
      this.classGroup.length = 0;
      this.toastr.error(`${item.name} removido da turma com sucesso!`);
      this.getClass(this.classId);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
