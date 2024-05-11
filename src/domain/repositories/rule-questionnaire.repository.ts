import { Observable } from "rxjs";

import { RuleQuestionnaireModel } from "../models/rule-questionnaire.model";

export abstract class RuleQuestionnaireRepository {
    abstract getRuleQuestionnaireByQuestId(params: {
        questionnaireId: number;
    }): Observable<RuleQuestionnaireModel[]>;
}
