import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  formGroup!: FormGroup;
  isSignedIn = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
      this.router.navigate(['/']);
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
    await this.authService.signup(this.email.value, this.password.value);
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
