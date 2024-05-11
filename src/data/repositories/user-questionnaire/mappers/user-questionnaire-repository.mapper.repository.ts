import { Mapper } from "../../../../base/mapper";
import { UserQuestionnaireModel } from "../../../../domain/models/user-questionnaire.model";
import { UserQuestionnaireEntity } from "../entities/user-questionnaire-entity";

export class UserQuestionnaireImplementationRepositoryMapper extends Mapper<
UserQuestionnaireEntity,
UserQuestionnaireModel
> {
    mapFrom(param: UserQuestionnaireEntity): UserQuestionnaireModel {
        return {
            userQuestionnaireId: param.id,
            score: param.score,
            userId: param.userId,
            questionnaireId: param.questionnaireId,
            createdAt: param.createdAt,
        };
    }
    mapTo(param: UserQuestionnaireModel): UserQuestionnaireEntity {
        return {
            id: param.userQuestionnaireId,
            score: param.score,
            userId: param.userId,
            questionnaireId: param.questionnaireId,
            createdAt: param.createdAt,
        };
    }
}
