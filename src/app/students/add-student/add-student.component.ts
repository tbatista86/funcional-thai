import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ConsultaCepService } from 'src/app/shared/service/consulta-cep.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  formGroup!: FormGroup;
  titleAlert: string = 'Campo Obrigatório';
  post: any = '';

  constructor(
    private formBuilder: FormBuilder,
    private cepService: ConsultaCepService,
    private crudApi: StudentService,
    public toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('user') == null) {
      this.router.navigate(['/']);
    }
    this.createForm();
    this.setChangeValidate();
  }

  createForm() {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      zipCode: [null, Validators.required],
      street: [null, Validators.required],
      number: [''],
      district: [null, Validators.required],
      city: [null, Validators.required],
      uf: [null, Validators.required],
      registration: [Date.now().toString(), Validators.required],
      email: [
        null,
        [Validators.pattern(emailregex)],
        // this.checkInUseEmail,
      ],
      phone: [null, Validators.required],
      paymentDay: [null, Validators.required],
      description: [null, [Validators.maxLength(100)]],
      dueDate: [null],
    });
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  get street() {
    return this.formGroup.get('street') as FormControl;
  }

  get number() {
    return this.formGroup.get('number') as FormControl;
  }

  get district() {
    return this.formGroup.get('district') as FormControl;
  }

  get city() {
    return this.formGroup.get('city') as FormControl;
  }

  get uf() {
    return this.formGroup.get('uf') as FormControl;
  }

  get phone() {
    return this.formGroup.get('phone') as FormControl;
  }

  get zipCode() {
    return this.formGroup.get('zipCode') as FormControl;
  }

  get email() {
    return this.formGroup.get('email') as FormControl;
  }

  get paymentDay() {
    return this.formGroup.get('paymentDay') as FormControl;
  }

  setChangeValidate() {
    this.formGroup.get('validate')?.valueChanges.subscribe((validate) => {
      if (validate == '1') {
        this.formGroup
          .get('name')
          ?.setValidators([Validators.required, Validators.minLength(3)]);
        this.titleAlert = 'Nome precisa ter no minímo 3 caracteres';
      } else {
        this.formGroup.get('name')?.setValidators(Validators.required);
      }
      this.formGroup.get('name')?.updateValueAndValidity();
    });
  }

  checkInUseEmail(control: { value: string }) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable((observer) => {
      setTimeout(() => {
        let result =
          db.indexOf(control.value) !== -1 ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }

  errorDayNumber() {
    return this.formGroup.get('paymentDay')?.hasError('required')
      ? 'Campo Obrigatório'
      : this.formGroup.get('paymentDay')?.errors?.min
      ? 'Data escolhida não existe'
      : this.formGroup.get('paymentDay')?.errors?.max
      ? 'Data escolhida não existe'
      : '';
  }

  getErrorEmail() {
    return this.formGroup.get('email')?.hasError('required')
      ? 'Campo obrigatório'
      : this.formGroup.get('email')?.hasError('pattern')
      ? 'Não é um email válido'
      : this.formGroup.get('email')?.hasError('alreadyInUse')
      ? 'Email em uso'
      : '';
  }

  onSubmit(post: any) {
    this.addDueDate();
    this.submitStudentData();
  }

  ResetForm() {
    this.formGroup.reset();
  }
  submitStudentData() {
    this.crudApi.AddStudent(this.formGroup.value);
    this.toastr.success(
      this.formGroup.controls['name'].value + ' cadastrado(a) com sucesso!'
    );
    this.ResetForm();
    this.router.navigate(['/']);
  }

  consultaCEP(cep: string) {
    cep = cep.replace(/\D/g, '');

    if (cep != null && cep !== '') {
      this.cepService
        .consultaCEP(cep)
        .subscribe((dados) => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any) {
    this.formGroup.get('zipCode')?.setValue(dados.cep);
    this.formGroup.get('street')?.setValue(dados.logradouro);
    this.formGroup.get('district')?.setValue(dados.bairro);
    this.formGroup.get('city')?.setValue(dados.localidade);
    this.formGroup.get('uf')?.setValue(dados.uf);
  }

  formatPhoneNumber(tel: any) {
    const value = tel.toString().replace(/\D/g, '');

    let foneFormatado = '';

    if (value.length > 12) {
      foneFormatado = value.replace(
        /(\d{2})?(\d{2})?(\d{5})?(\d{4})/,
        '+$1 ($2) $3-$4'
      );
    } else if (value.length > 11) {
      foneFormatado = value.replace(
        /(\d{2})?(\d{2})?(\d{4})?(\d{4})/,
        '+$1 ($2) $3-$4'
      );
    } else if (value.length > 10) {
      foneFormatado = value.replace(/(\d{2})?(\d{5})?(\d{4})/, '($1) $2-$3');
    } else if (value.length > 9) {
      foneFormatado = value.replace(/(\d{2})?(\d{4})?(\d{4})/, '($1) $2-$3');
    } else if (value.length > 5) {
      foneFormatado = value.replace(/^(\d{2})?(\d{4})?(\d{0,4})/, '($1) $2-$3');
    } else if (value.length > 1) {
      foneFormatado = value.replace(/^(\d{2})?(\d{0,5})/, '($1) $2');
    } else {
      if (tel !== '') {
        foneFormatado = value.replace(/^(\d*)/, '($1');
      }
    }
    this.formGroup.get('phone')?.setValue(foneFormatado);
  }

  addDueDate() {
    let date = this.formGroup.get('paymentDay').value;

    let currentDate = new Date();

    currentDate.setDate(date);

    let dueDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));

    this.formGroup.get('dueDate')?.setValue(dueDate);
  }
}
