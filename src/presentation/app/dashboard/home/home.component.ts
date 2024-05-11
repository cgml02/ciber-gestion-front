import { Component } from "@angular/core";
import Swal from "sweetalert2";

import { QuestionnaireModel } from "../../../../domain/models/questionnaire.model";
import { RuleQuestionnaireModel } from "../../../../domain/models/rule-questionnaire.model";
import { AuthService } from "../../../../domain/services/auth.service";
import { QuestionnaireGetAllUseCase } from "../../../../domain/usecases/questionnaire/questionnaire-getall.usecase";
import { RuleQuestionnaireGetByQuestUseCase } from "../../../../domain/usecases/rule-questionnaire/rule-questionnaire-getbyquest.usecase";
import { UserQuestionnaireCreateUseCase } from "../../../../domain/usecases/user-questionnaire/user-questionnaire-create.usecase";
import { UserQuestionnaireGetUseCase } from "../../../../domain/usecases/user-questionnaire/user-questionnaire-get.usecase";
import { UserQuestionnaireClassificationModel } from "../../../../domain/models/user-questionnaire.model";

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
    userQuestionnaire: UserQuestionnaireClassificationModel | null | undefined;
    
    numbers: number[] = Array.from({length: 10}, (_, i) => i + 1);
    selectedNumber: number = 0;
    userId: string = '';
    questionnaireId: number = 0;

    constructor(
        private authService: AuthService,
        private questionnaireService: QuestionnaireGetAllUseCase,
        private ruleQuestionnaireService: RuleQuestionnaireGetByQuestUseCase,
        private userQuestionnaireService: UserQuestionnaireCreateUseCase,
        private userQuestionnaireGetService: UserQuestionnaireGetUseCase,
    ) {}

    ngOnInit(): void {
        this.authService.getIsAdmin().subscribe((isAdmin) => {
            this.isAdmin = isAdmin;
        });
        this.authService.getUserInfo().subscribe((user) => {
            this.userId = user?.userId ?? '';
        });
        this.getQuestionnaires();
    }

    showDetailTable(questionnaireId?: number): void {
        this.showDetail = !this.showDetail;

        if (questionnaireId && questionnaireId !== 0) {
            this.getUserQuestionnaire(questionnaireId);
        }
    }

    getQuestionnaires(): void {
        this.questionnaireService.execute({ userId: this.userId}).subscribe(
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

    createUserQuestionnaire(questionnaireId: number): void {
        if (this.selectedNumber == 0){
            Swal.fire({
                icon: "error",
                title: "Debe escoger un número",
                text: "Seleccione una opción de calificación",
            });
            return; 
        }

        if (!this.userId || this.userId === '') {
            Swal.fire({
                icon: "error",
                title: "Ocurrió un error",
                text: "No se pudo obtener la sesión del usuario",
            });
            return; 
        }

        this.userQuestionnaireService.execute({
            score: Number(this.selectedNumber),
            userId: this.userId,
            questionnaireId
        }).subscribe(
            () => {
                Swal.fire({
                    icon: "success",
                    title: "Respuesta guardada",
                    text: "Respuesta registrada exitosamente!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.getQuestionnaires();
                    }
                });
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

    getUserQuestionnaire(questionnaireId: number): void {
        this.userQuestionnaireGetService.execute({
            questionnaireId
        }).subscribe(
            (response) => {
                this.userQuestionnaire = response;
            },
            (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error cargando las respuestas de las encuestas",
                    text:
                        error.message
                        || "Ha ocurrido un error durante el cargue de las respuestas.",
                });
            }
        );
    }

    getDisplayIndex(index: number): number {
        return index === 0 ? index + 1 : index;
    }
}
