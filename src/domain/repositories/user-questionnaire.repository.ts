import { Observable } from "rxjs";

import { UserQuestionnaireClassificationModel, UserQuestionnaireModel } from "../models/user-questionnaire.model";

export abstract class UserQuestionnaireRepository {
    abstract createUserQuestionnaire(params: {
        score: number;
        userId: string;
        questionnaireId: number
    }): Observable<UserQuestionnaireModel>;

    abstract getUserQuestionnaire(params: {
        questionnaireId: number
    }): Observable<UserQuestionnaireClassificationModel>;
}
