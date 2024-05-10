import { Component } from "@angular/core";
import Swal from "sweetalert2";

import { QuestionnaireModel } from "../../../../domain/models/questionnaire.model";
import { RuleQuestionnaireModel } from "../../../../domain/models/rule-questionnaire.model";
import { AuthService } from "../../../../domain/services/auth.service";
import { QuestionnaireGetAllUseCase } from "../../../../domain/usecases/questionnaire/questionnaire-getall.usecase";
import { RuleQuestionnaireGetByQuestUseCase } from "../../../../domain/usecases/rule-questionnaire/rule-questionnaire-getbyquest.usecase";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent {
    isAdmin: boolean = false;
    showDetail: boolean = false;
    questionnaires: QuestionnaireModel[] = [];
    ruleQuestionnaires: RuleQuestionnaireModel[] = [];

    constructor(
        private authService: AuthService,
        private questionnaireService: QuestionnaireGetAllUseCase,
        private ruleQuestionnaireService: RuleQuestionnaireGetByQuestUseCase
    ) {}

    ngOnInit(): void {
        this.authService.getIsAdmin().subscribe((isAdmin) => {
            this.isAdmin = isAdmin;
        });
        this.getQuestionnaires();
    }

    showDetailTable(questionnaireId?: number): void {
        this.showDetail = !this.showDetail;

        if (questionnaireId) {
            this.getRuleQuestionnaireByQuestId(questionnaireId);
        }
    }

    getQuestionnaires(): void {
        this.questionnaireService.execute().subscribe(
            (response) => {
                this.questionnaires = response;
            },
            (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error cargando las encuestas",
                    text:
            error.message
            || "Ha ocurrido un error durante el cargue de las encuentas.",
                });
            }
        );
    }

    getRuleQuestionnaireByQuestId(questionnaireId: number): void {
        this.ruleQuestionnaireService.execute({ questionnaireId }).subscribe(
            (response) => {
                this.ruleQuestionnaires = response;
            },
            (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error cargando las encuestas",
                    text:
            error.message
            || "Ha ocurrido un error durante el cargue de las encuentas.",
                });
            }
        );
    }
}
