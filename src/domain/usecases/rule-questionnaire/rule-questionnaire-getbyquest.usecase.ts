import { Observable } from "rxjs";

import { UseCase } from "../../../base/use-case";
import { RuleQuestionnaireModel } from "../../models/rule-questionnaire.model";
import { RuleQuestionnaireRepository } from "../../repositories/rule-questionnaire.repository";

export class RuleQuestionnaireGetByQuestUseCase
implements UseCase<{ questionnaireId: number }, RuleQuestionnaireModel[]> {
    constructor(
        private ruleQuestionnaireRepository: RuleQuestionnaireRepository
    ) {}

    execute(params: { questionnaireId: number }): Observable<RuleQuestionnaireModel[]> {
        return this.ruleQuestionnaireRepository.getRuleQuestionnaireByQuestId(params);
    }
}
