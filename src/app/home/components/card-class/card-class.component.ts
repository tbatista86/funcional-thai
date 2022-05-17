import { ToastrService } from 'ngx-toastr';
import { ClassService } from './../../../class/class.service';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-class',
  templateUrl: './card-class.component.html',
  styleUrls: ['./card-class.component.scss'],
})
export class CardClassComponent implements OnInit {
  classList: any[];

  constructor(
    private service: HomeService,
    private classService: ClassService,
    private router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') == null) {
      this.router.navigate(['/']);
    }
    this.getAllClass();
  }

  async getAllClass() {
    await this.service.GetClassList().subscribe(
      (res) => {
        this.classList = res.map((e: any) => {
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

  async createClass() {
    await this.classService.AddClass();
    this.toastr.info(`Nova turma criado com sucesso`);
  }
}
