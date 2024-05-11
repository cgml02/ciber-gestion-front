import { Observable } from 'rxjs';

import { UseCase } from '../../../base/use-case';
import { UserQuestionnaireRepository } from '../../repositories/user-questionnaire.repository';
import { UserQuestionnaireModel } from '../../models/user-questionnaire.model';

export class UserQuestionnaireCreateUseCase
  implements
    UseCase<
      { score: number; userId: string; questionnaireId: number },
      UserQuestionnaireModel
    >
{
  constructor(
    private userQuestionnaireRepository: UserQuestionnaireRepository
  ) {}

  execute(params: {
    score: number;
    userId: string;
    questionnaireId: number;
  }): Observable<UserQuestionnaireModel> {
    return this.userQuestionnaireRepository.createUserQuestionnaire(params);
  }
}
