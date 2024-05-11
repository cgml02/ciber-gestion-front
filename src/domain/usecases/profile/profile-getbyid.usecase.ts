import { Observable } from "rxjs";

import { UseCase } from "../../../base/use-case";
import { ProfileModel } from "../../models/profile.model";
import { ProfileRepository } from "../../repositories/profile.repository";

export class ProfileGetByIdUseCase
implements UseCase<{ id: number }, ProfileModel> {
    constructor(private profileRepository: ProfileRepository) {}

    execute(params: { id: number }): Observable<ProfileModel> {
        return this.profileRepository.getProfileById(params);
    }
}
