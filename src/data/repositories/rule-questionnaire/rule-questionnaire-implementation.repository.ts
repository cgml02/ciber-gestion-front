import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { RuleQuestionnaireModel } from "../../../domain/models/rule-questionnaire.model";
import { RuleQuestionnaireRepository } from "../../../domain/repositories/rule-questionnaire.repository";
import { environment } from "../../../enviroments/environment";
import { RuleQuestionnaireEntity } from "./entities/rule-questionnaire-entity";
import { RuleQuestionnaireImplementationRepositoryMapper } from "./mappers/rule-questionnaire-repository.mapper";

@Injectable({
    providedIn: "root",
})
export class RuleQuestionnaireImplementationRepository extends RuleQuestionnaireRepository {
    ruleQuestionnaireMapper = new RuleQuestionnaireImplementationRepositoryMapper();

    constructor(private http: HttpClient) {
        super();
    }

    getRuleQuestionnaireByQuestId(params: {
        questionnaireId: number;
    }): Observable<RuleQuestionnaireModel[]> {
        return this.http
            .get<RuleQuestionnaireEntity[]>(
            `${environment.apiUrl}rulequestionnaire/${params.questionnaireId}`
        )
            .pipe(map(this.ruleQuestionnaireMapper.mapFrom));
    }
}
