import { Observable } from "rxjs";

import { QuestionnaireModel } from "../models/questionnaire.model";

export abstract class QuestionnaireRepository {
    abstract getQuestionnaires(params: {
        userId: string;
    }): Observable<QuestionnaireModel[]>;
}
