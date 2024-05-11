import { Mapper } from "../../../../base/mapper";
import { UserModel } from "../../../../domain/models/user.model";
import { UserEntity } from "../entities/user-entity";

export class UserImplementationRepositoryMapper extends Mapper<
UserEntity,
UserModel
> {
    mapFrom(param: UserEntity): UserModel {
        return {
            userId: param.id,
            profileId: param.profileId,
            firstName: param.firstName,
            lastName: param.lastName,
            email: param.email,
            password: param.password,
            createdAt: param.createdAt,
        };
    }
    mapTo(param: UserModel): UserEntity {
        return {
            id: param.userId,
            profileId: param.profileId,
            firstName: param.firstName,
            lastName: param.lastName,
            email: param.email,
            password: param.password,
            createdAt: param.createdAt,
        };
    }
}
