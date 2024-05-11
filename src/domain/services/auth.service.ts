import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UserModel } from "../models/user.model";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private userInfo: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);

    setIsAdmin(isAdmin: boolean): void {
        this.isAdminSubject.next(isAdmin);
    }

    getIsAdmin(): Observable<boolean> {
        return this.isAdminSubject.asObservable();
    }

    setUserInfo(user: UserModel): void {
        this.userInfo.next(user);
    }

    getUserInfo(): Observable<UserModel | null> {
        return this.userInfo.asObservable();
    }
}
