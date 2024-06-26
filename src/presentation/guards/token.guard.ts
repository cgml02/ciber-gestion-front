import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class TokenGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(): boolean {
        const token = localStorage.getItem("token");
        if (!token) {
            this.router.navigate(["/auth/login"], { skipLocationChange: true });
            return false;
        }
        return true;
    }
}
