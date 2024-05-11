import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { QuestionnaireModel } from '../../../../domain/models/questionnaire.model';
import { RuleQuestionnaireModel } from '../../../../domain/models/rule-questionnaire.model';
import { AuthService } from '../../../../domain/services/auth.service';
import { QuestionnaireGetAllUseCase } from '../../../../domain/usecases/questionnaire/questionnaire-getall.usecase';
import { RuleQuestionnaireGetByQuestUseCase } from '../../../../domain/usecases/rule-questionnaire/rule-questionnaire-getbyquest.usecase';
import { UserQuestionnaireCreateUseCase } from '../../../../domain/usecases/user-questionnaire/user-questionnaire-create.usecase';
import { UserQuestionnaireGetUseCase } from '../../../../domain/usecases/user-questionnaire/user-questionnaire-get.usecase';
import { UserQuestionnaireClassificationModel } from '../../../../domain/models/user-questionnaire.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isAdmin: boolean = false;
  showDetail: boolean = false;
  isUserQuestionarie: boolean = false;

  questionnaires: QuestionnaireModel[] = [];
  ruleQuestionnaires: RuleQuestionnaireModel[] = [];
  userQuestionnaire: UserQuestionnaireClassificationModel | null | undefined;

  numbers: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  selectedNumber: number[] = [];
  userId: string = '';
  questionnaireId: number = 0;
  selectedQuestionnaireId: number | null = null;
  selectValues: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  constructor(
    private authService: AuthService,
    private questionnaireService: QuestionnaireGetAllUseCase,
    private ruleQuestionnaireService: RuleQuestionnaireGetByQuestUseCase,
    private userQuestionnaireService: UserQuestionnaireCreateUseCase,
    private userQuestionnaireGetService: UserQuestionnaireGetUseCase
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
    if (questionnaireId !== undefined) {
      this.showDetail = true;
      this.selectedQuestionnaireId = questionnaireId;
      this.getUserQuestionnaire(questionnaireId);
    } else {
      this.showDetail = false;
      this.selectedQuestionnaireId = null;
    }
  }

  getQuestionnaires(): void {
    this.questionnaireService.execute({ userId: this.userId }).subscribe(
      (response) => {
        this.questionnaires = response;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error cargando las encuestas',
          text:
            error.error.message ||
            'Ha ocurrido un error durante el cargue de las encuentas.',
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
          icon: 'error',
          title: 'Error cargando las encuestas',
          text:
            error.error.message ||
            'Ha ocurrido un error durante el cargue de las encuentas.',
        });
      }
    );
  }

  createUserQuestionnaire(questionnaireId: number, index: number): void {
    if (this.isUserQuestionarie) {
      return;
    }

    if (this.selectedNumber[index] == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Debe escoger un número',
        text: 'Seleccione una opción de calificación',
      });
      return;
    }

    if (!this.userId || this.userId === '') {
      Swal.fire({
        icon: 'error',
        title: 'Ocurrió un error',
        text: 'No se pudo obtener la sesión del usuario',
      });
      return;
    }

    this.isUserQuestionarie = true;

    this.userQuestionnaireService
      .execute({
        score: Number(this.selectedNumber[index]),
        userId: this.userId,
        questionnaireId,
      })
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Respuesta guardada',
            text: 'Respuesta registrada exitosamente!',
          }).then((result) => {
            if (result.isConfirmed) {
              this.getQuestionnaires();
            }
          });
          this.isUserQuestionarie = false;
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error cargando las encuestas',
            text:
              error.error.message ||
              'Ha ocurrido un error durante el cargue de las encuentas.',
          });
          this.isUserQuestionarie = false;
        },
        complete: () => {
          this.isUserQuestionarie = false;
        },
      });
  }

  getUserQuestionnaire(questionnaireId: number): void {
    this.userQuestionnaireGetService
      .execute({
        questionnaireId,
      })
      .subscribe(
        (response) => {
          this.userQuestionnaire = response;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error cargando las respuestas de las encuestas',
            text:
              error.error.message ||
              'Ha ocurrido un error durante el cargue de las respuestas.',
          });
        }
      );
  }

  getDisplayIndex(index: number): number {
    return index + 1;
  }
}
