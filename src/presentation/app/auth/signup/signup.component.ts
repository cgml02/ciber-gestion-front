import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

import { UserRegisterUseCase } from "../../../../domain/usecases/user/user-register.usecase";

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html",
    styleUrl: "./signup.component.scss",
})
export class SignupComponent implements OnInit {
    isWrong = false;

    constructor(
        private readonly router: Router,
        private fb: FormBuilder,
        private userRegister: UserRegisterUseCase
    ) {}

    loginForm = this.fb.group({
        name: ["", [Validators.required, Validators.minLength(3)]],
        lastName: ["", [Validators.required, Validators.minLength(3)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(8)]],
    });

    get name() {
        return this.loginForm.get("name");
    }

    get lastName() {
        return this.loginForm.get("lastName");
    }

    get email() {
        return this.loginForm.get("email");
    }

    get password() {
        return this.loginForm.get("password");
    }

    ngOnInit(): void {
        const token = localStorage.getItem("token");
        if (token) {
            this.redirectUsers();
        }
    }

    public redirectUsers(): void {
        this.router.navigate(["/home"], { skipLocationChange: true });
    }

    public logIn(): void {
        this.router.navigate(["/auth/login"], { skipLocationChange: true });
    }

    async signUp() {
        const firstName = this.name?.value;
        const lastName = this.lastName?.value;
        const email = this.email?.value;
        const password = this.password?.value;

        if (firstName && lastName && email && password) {
            this.userRegister
                .execute({
                    firstName, lastName, email, password
                })
                .subscribe(
                    () => {
                        Swal.fire({
                            icon: "success",
                            title: "Registro exitoso",
                            text: "Usuario registrado exitosamente!",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.logIn();
                            }
                        });
                    },
                    (error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error durante el registro de usuario",
                            text:
                error.message
                || "Ha ocurrido un error durante el registro de usuario.",
                        });
                    }
                );
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Por favor, complete todos los campos requeridos para registrarse.",
            });
        }
    }
}
