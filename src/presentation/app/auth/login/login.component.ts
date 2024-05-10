import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isWrong = false;

  constructor(private readonly router: Router, private fb: FormBuilder) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
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

    console.log(email);
    console.log(password);
  }
}
