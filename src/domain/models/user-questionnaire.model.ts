export interface UserQuestionnaireModel {
  userQuestionnaireId: number;
  score: number;
  userId: string;
  questionnaireId: number;
  createdAt: Date;
}

export interface UserQuestionnaireClassificationModel {
  classificationDetail: ClassificationDetail[];
  totalNps: number;
}

interface ClassificationDetail {
  classification: string;
  score: number;
}
