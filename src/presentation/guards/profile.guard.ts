import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import Swal from "sweetalert2";

import { AuthService } from "../../domain/services/auth.service";
import { ProfileGetByIdUseCase } from "../../domain/usecases/profile/profile-getbyid.usecase";
import { environment } from "../../enviroments/environment";

@Injectable({
    providedIn: "root"
})
export class ProfileGuard implements CanActivate {
    constructor(
        private getProfileById: ProfileGetByIdUseCase,
        private router: Router,
        private authService: AuthService,
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot
    ): Observable<boolean> {
        this.authService.setIsAdmin(false);
        const profileId = +route.queryParams["profileId"];

        if (!profileId || profileId === 0) {
            this.logout();
            return of(false);
        }

        return this.getProfileById.execute({ id: profileId }).pipe(
            map((response) => {
                if (response.name === environment.profileAdmin) {
                    this.authService.setIsAdmin(true);
                    return true;
                }
                return true;
            }),
            catchError((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error al identificar el perfil del usuario",
                    text: error.error.message || "Ocurrió un error durante la autenticación."
                });
                this.logout();
                return of(false);
            })
        );
    }

    private logout(): void {
        localStorage.removeItem("token");
        this.router.navigate(["/auth/login"], { skipLocationChange: true });
    }
}
