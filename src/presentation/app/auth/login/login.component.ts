import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

import { UserLoginUseCase } from "../../../../domain/usecases/user/user-login.usecase";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
    isWrong = false;
    profileId: number = 0;

    constructor(
        private readonly router: Router,
        private fb: FormBuilder,
        private userLogin: UserLoginUseCase
    ) {}

    loginForm = this.fb.group({
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required]],
    });

    get email() {
        return this.loginForm.get("email");
    }

    get password() {
        return this.loginForm.get("password");
    }

    ngOnInit(): void {
        const token = localStorage.getItem("token");
        if (token) {
            this.redirectUsers(this.profileId);
        }
    }

    public redirectUsers(profileId: number): void {
        this.router.navigate(["/home"], {
            queryParams: { profileId },
            skipLocationChange: true,
        });
    }

    public signUp(): void {
        this.router.navigate(["/auth/signup"], { skipLocationChange: true });
    }

    async logIn() {
        const email = this.email?.value;
        const password = this.password?.value;

        if (email && password) {
            this.userLogin.execute({ email, password }).subscribe(
                (response) => {
                    localStorage.setItem("token", email);
                    this.profileId = response.profileId;
                    this.redirectUsers(this.profileId);
                },
                (error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error durante el inicio de sesión",
                        text:
              error.message
              || "Ha ocurrido un error durante el inicio de sesión.",
                    });
                }
            );
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Por favor, proporcione un email y una contraseña válidos.",
            });
        }
    }
}
