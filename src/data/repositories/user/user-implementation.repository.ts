import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { UserModel } from "../../../domain/models/user.model";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { environment } from "../../../enviroments/environment";
import { UserEntity } from "./entities/user-entity";
import { UserImplementationRepositoryMapper } from "./mappers/user-repository.mapper";

@Injectable({
    providedIn: "root",
})
export class UserImplementationRepository extends UserRepository {
    userMapper = new UserImplementationRepositoryMapper();

    constructor(private http: HttpClient) {
        super();
    }

    login(params: { email: string; password: string }): Observable<UserModel> {
        return this.http
            .post<UserEntity>(`${environment.apiUrl}user/login`, params)
            .pipe(map(this.userMapper.mapFrom));
    }

    register(params: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }): Observable<UserModel> {
        return this.http
            .post<UserEntity>(`${environment.apiUrl}user/signup`, params)
            .pipe(map(this.userMapper.mapFrom));
    }
}
