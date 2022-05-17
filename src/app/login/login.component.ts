import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  isSignedIn = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    debugger;
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
      this.router.navigate(['/home']);
    } else {
      this.isSignedIn = false;
    }
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.pattern(emailregex)]],
      password: [null, Validators.required],
    });
  }

  get email() {
    return this.formGroup.get('email') as FormControl;
  }

  get password() {
    return this.formGroup.get('password') as FormControl;
  }

  async onSubmit() {
    debugger;
    let test = await this.authService.signin(
      this.email.value,
      this.password.value
    );

    console.log(test);
    if (this.authService.isLogged) {
      this.isSignedIn = true;
      this.router.navigate(['home']);
    }
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
}
