import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  isWrong = false;

  constructor(private readonly router: Router, private fb: FormBuilder) {}

  loginForm = this.fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  get name() {
    return this.loginForm.get('name');
  }

  get lastName() {
    return this.loginForm.get('lastName');
  }

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

  public logIn(): void {
    this.router.navigateByUrl('/auth/login');
  }

  async signUp() {
    const name = this.name?.value;
    const lastName = this.lastName?.value;
    const email = this.email?.value;
    const password = this.password?.value;

    console.log(name);
    console.log(lastName);
    console.log(email);
    console.log(password);
  }
}
