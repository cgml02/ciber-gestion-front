import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../../enviroments/environment";
import { UserQuestionnaireRepository } from "../../../domain/repositories/user-questionnaire.repository";
import { UserQuestionnaireImplementationRepositoryMapper } from "./mappers/user-questionnaire-repository.mapper.repository";
import { UserQuestionnaireClassificationModel, UserQuestionnaireModel } from "../../../domain/models/user-questionnaire.model";
import { UserQuestionnaireEntity } from "./entities/user-questionnaire-entity";

@Injectable({
    providedIn: "root",
})
export class UserQuestionnaireImplementationRepository extends UserQuestionnaireRepository {
    userMapper = new UserQuestionnaireImplementationRepositoryMapper();

    constructor(private http: HttpClient) {
        super();
    }

    createUserQuestionnaire(params: {
        score: number;
        userId: string;
        questionnaireId: number;
    }): Observable<UserQuestionnaireModel> {
        return this.http
            .post<UserQuestionnaireEntity>(`${environment.apiUrl}UserQuestionnaire`, params)
            .pipe(map(this.userMapper.mapFrom));
    }

    getUserQuestionnaire(params: {
        questionnaireId: number
    }): Observable<UserQuestionnaireClassificationModel> {
        return this.http
            .get<UserQuestionnaireClassificationModel>(
            `${environment.apiUrl}UserQuestionnaire/${params.questionnaireId}`
        );
    }
}
