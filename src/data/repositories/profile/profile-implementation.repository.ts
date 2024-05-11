import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ProfileModel } from "../../../domain/models/profile.model";
import { ProfileRepository } from "../../../domain/repositories/profile.repository";
import { environment } from "../../../enviroments/environment";
import { ProfileEntity } from "./entities/profile-entity";
import { ProfileImplementationRepositoryMapper } from "./mappers/profile-repository.mapper";

@Injectable({
    providedIn: "root",
})
export class ProfileImplementationRepository extends ProfileRepository {
    profileMapper = new ProfileImplementationRepositoryMapper();

    constructor(private http: HttpClient) {
        super();
    }

    getProfileById(params: { id: number }): Observable<ProfileModel> {
        return this.http
            .get<ProfileEntity>(`${environment.apiUrl}profile/${params.id}`)
            .pipe(map(this.profileMapper.mapFrom));
    }
}
