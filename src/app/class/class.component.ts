import { ToastrService } from 'ngx-toastr';
import { ClassService } from './class.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  classList: any[] = [];
  class: any[] = [];
  totalStudentsCLass: any[] = [];
  classNumber = 1;

  constructor(
    private service: ClassService,
    private router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllClass();
  }

  getAllClass() {
    this.service.GetGroupList().subscribe(
      (res) => {
        res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          this.classList.push(data);

          return data;
        });
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
          this.class.push(data);
          return data;
        });
      },
      (err) => {
        console.error(err);
      }
    );
  }

  openClass(id: string) {
    this.router.navigate([`edit-class/${id}`]);
  }

  convertClassNametoNumber(id: string) {
    let turma = `Turma: ${id.substring(0, 3)}`;
    this.classNumber++;
    return turma;
  }

  removeClass(id: string) {
    if (confirm('Deseja apagar a Turma')) {
      this.service.DeleteClass(id);
      this.toastr.error(`Turma apagada com sucesso`);
    }
    document.location.reload();
  }
}
