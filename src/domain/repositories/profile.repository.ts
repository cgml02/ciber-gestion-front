import { Observable } from "rxjs";

import { ProfileModel } from "../models/profile.model";

export abstract class ProfileRepository {
    abstract getProfileById(params: {
        id: number;
    }): Observable<ProfileModel>;
}
