export interface UserQuestionnaireEntity {
    id: number;
    score: number;
    userId: string;
    questionnaireId: number;
    createdAt: Date;
}
