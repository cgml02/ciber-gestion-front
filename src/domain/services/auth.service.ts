import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    setIsAdmin(isAdmin: boolean): void {
        this.isAdminSubject.next(isAdmin);
    }

    getIsAdmin(): Observable<boolean> {
        return this.isAdminSubject.asObservable();
    }
}
