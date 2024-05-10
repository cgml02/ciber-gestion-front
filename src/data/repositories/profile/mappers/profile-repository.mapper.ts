import { Mapper } from "../../../../base/mapper";
import { ProfileModel } from "../../../../domain/models/profile.model";
import { ProfileEntity } from "../entities/profile-entity";

export class ProfileImplementationRepositoryMapper extends Mapper<
ProfileEntity,
ProfileModel
> {
    mapFrom(param: ProfileEntity): ProfileModel {
        return {
            profileId: param.id,
            name: param.name,
            description: param.description,
            createdAt: param.createdAt,
        };
    }
    mapTo(param: ProfileModel): ProfileEntity {
        return {
            id: param.profileId,
            name: param.name,
            description: param.description,
            createdAt: param.createdAt,
        };
    }
}
