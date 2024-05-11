import { Mapper } from "../../../../base/mapper";
import { QuestionnaireModel } from "../../../../domain/models/questionnaire.model";
import { QuestionnaireEntity } from "../entities/questionnaire-entity";

export class QuestionnaireImplementationRepositoryMapper extends Mapper<
QuestionnaireEntity[],
QuestionnaireModel[]
> {
    mapFrom(param: QuestionnaireEntity[]): QuestionnaireModel[] {
        return param.map((entity) => ({
            questionnaireId: entity.id,
            name: entity.name,
            question: entity.question,
            createdAt: entity.createdAt,
        }));
    }

    mapTo(param: QuestionnaireModel[]): QuestionnaireEntity[] {
        return param.map((model) => ({
            id: model.questionnaireId,
            name: model.name,
            question: model.question,
            createdAt: model.createdAt,
        }));
    }
}
