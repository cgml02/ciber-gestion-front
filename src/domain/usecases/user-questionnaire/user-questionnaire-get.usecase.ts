import { Observable } from 'rxjs';

import { UseCase } from '../../../base/use-case';
import { UserQuestionnaireRepository } from '../../repositories/user-questionnaire.repository';
import { UserQuestionnaireClassificationModel, UserQuestionnaireModel } from '../../models/user-questionnaire.model';

export class UserQuestionnaireGetUseCase
  implements
    UseCase<
      { questionnaireId: number },
      UserQuestionnaireClassificationModel
    >
{
  constructor(
    private userQuestionnaireRepository: UserQuestionnaireRepository
  ) {}

  execute(params: {
    questionnaireId: number;
  }): Observable<UserQuestionnaireClassificationModel> {
    return this.userQuestionnaireRepository.getUserQuestionnaire(params);
  }
}
