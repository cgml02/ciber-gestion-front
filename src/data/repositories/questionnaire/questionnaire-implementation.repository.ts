import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { QuestionnaireModel } from "../../../domain/models/questionnaire.model";
import { QuestionnaireRepository } from "../../../domain/repositories/questionnaire.repository";
import { environment } from "../../../enviroments/environment";
import { QuestionnaireEntity } from "./entities/questionnaire-entity";
import { QuestionnaireImplementationRepositoryMapper } from "./mappers/questionnaire-repository.mapper";

@Injectable({
    providedIn: "root",
})
export class QuestionnaireImplementationRepository extends QuestionnaireRepository {
    questionnaireMapper = new QuestionnaireImplementationRepositoryMapper();

    constructor(private http: HttpClient) {
        super();
    }

    getQuestionnaires(params: {
        userId: string;
    }): Observable<QuestionnaireModel[]> {
        return this.http
            .get<QuestionnaireEntity[]>(`${environment.apiUrl}questionnaire/${params.userId}`)
            .pipe(map(this.questionnaireMapper.mapFrom));
    }
}
