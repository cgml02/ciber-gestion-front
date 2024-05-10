import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginUseCase } from '../../../../domain/usecases/user/user-login.usecase';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isWrong = false;

  constructor(
    private readonly router: Router,
    private fb: FormBuilder,
    private userLogin: UserLoginUseCase
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.redirectUsers();
    }
  }

  public redirectUsers(): void {
    this.router.navigateByUrl('/home');
  }

  public signUp(): void {
    this.router.navigateByUrl('/auth/signup');
  }

  async logIn() {
    const email = this.email?.value;
    const password = this.password?.value;

    if (email && password) {
      this.userLogin.execute({ email, password }).subscribe(
        () => {
          localStorage.setItem('token', email);
          this.redirectUsers();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error durante el inicio de sesión',
            text:
              error.message ||
              'Ha ocurrido un error durante el inicio de sesión.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, proporcione un email y una contraseña válidos.',
      });
    }
  }
}
