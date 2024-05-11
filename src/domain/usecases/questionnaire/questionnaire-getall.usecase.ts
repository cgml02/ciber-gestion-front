import { Observable } from "rxjs";

import { UseCase } from "../../../base/use-case";
import { QuestionnaireModel } from "../../models/questionnaire.model";
import { QuestionnaireRepository } from "../../repositories/questionnaire.repository";

export class QuestionnaireGetAllUseCase implements UseCase<{ userId: string; }, QuestionnaireModel[]> {
    constructor(private questionnaireRepository: QuestionnaireRepository) {}

    execute(params: { userId: string }): Observable<QuestionnaireModel[]> {
        return this.questionnaireRepository.getQuestionnaires(params);
    }
}
