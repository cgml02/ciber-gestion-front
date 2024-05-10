import { Mapper } from "../../../../base/mapper";
import { RuleQuestionnaireModel } from "../../../../domain/models/rule-questionnaire.model";
import { RuleQuestionnaireEntity } from "../entities/rule-questionnaire-entity";

export class RuleQuestionnaireImplementationRepositoryMapper extends Mapper<
RuleQuestionnaireEntity[],
RuleQuestionnaireModel[]
> {
    mapFrom(param: RuleQuestionnaireEntity[]): RuleQuestionnaireModel[] {
        return param.map((entity) => ({
            ruleQuestionnaireId: entity.id,
            scoreStart: entity.scoreStart,
            scoreEnd: entity.scoreEnd,
            classification: entity.classification,
            createdAt: entity.createdAt,
        }));
    }

    mapTo(param: RuleQuestionnaireModel[]): RuleQuestionnaireEntity[] {
        return param.map((model) => ({
            id: model.ruleQuestionnaireId,
            scoreStart: model.scoreStart,
            scoreEnd: model.scoreEnd,
            classification: model.classification,
            createdAt: model.createdAt,
        }));
    }
}
