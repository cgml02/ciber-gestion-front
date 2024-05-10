import { Observable } from "rxjs";

import { UseCase } from "../../../base/use-case";
import { QuestionnaireModel } from "../../models/questionnaire.model";
import { QuestionnaireRepository } from "../../repositories/questionnaire.repository";

export class QuestionnaireGetAllUseCase implements UseCase<null, QuestionnaireModel[]> {
    constructor(private questionnaireRepository: QuestionnaireRepository) {}

    execute(): Observable<QuestionnaireModel[]> {
        return this.questionnaireRepository.getQuestionnaires();
    }
}
