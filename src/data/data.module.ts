import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { ProfileRepository } from "../domain/repositories/profile.repository";
import { QuestionnaireRepository } from "../domain/repositories/questionnaire.repository";
import { RuleQuestionnaireRepository } from "../domain/repositories/rule-questionnaire.repository";
import { UserRepository } from "../domain/repositories/user.repository";
import { ProfileGetByIdUseCase } from "../domain/usecases/profile/profile-getbyid.usecase";
import { QuestionnaireGetAllUseCase } from "../domain/usecases/questionnaire/questionnaire-getall.usecase";
import { RuleQuestionnaireGetByQuestUseCase } from "../domain/usecases/rule-questionnaire/rule-questionnaire-getbyquest.usecase";
import { UserLoginUseCase } from "../domain/usecases/user/user-login.usecase";
import { UserRegisterUseCase } from "../domain/usecases/user/user-register.usecase";
import { ProfileImplementationRepository } from "./repositories/profile/profile-implementation.repository";
import { QuestionnaireImplementationRepository } from "./repositories/questionnaire/questionnaire-implementation.repository";
import { RuleQuestionnaireImplementationRepository } from "./repositories/rule-questionnaire/rule-questionnaire-implementation.repository";
import { UserImplementationRepository } from "./repositories/user/user-implementation.repository";

const userLoginUseCaseFactory = (userRepo: UserRepository) => new UserLoginUseCase(userRepo);
export const userLoginUseCaseProvider = {
    provide: UserLoginUseCase,
    useFactory: userLoginUseCaseFactory,
    deps: [UserRepository],
};

const userRegisterUseCaseFactory = (userRepo: UserRepository) => new UserRegisterUseCase(userRepo);
export const userRegisterUseCaseProvider = {
    provide: UserRegisterUseCase,
    useFactory: userRegisterUseCaseFactory,
    deps: [UserRepository],
};

const getProfileByIdUseCaseFactory = (profileRepo: ProfileRepository) => new ProfileGetByIdUseCase(profileRepo);
export const getProfileByIdUseProvider = {
    provide: ProfileGetByIdUseCase,
    useFactory: getProfileByIdUseCaseFactory,
    deps: [ProfileRepository],
};

const getQuestionnairesUseCaseFactory = (questionRepo: QuestionnaireRepository) => new QuestionnaireGetAllUseCase(questionRepo);
export const getQuestionnairesUseProvider = {
    provide: QuestionnaireGetAllUseCase,
    useFactory: getQuestionnairesUseCaseFactory,
    deps: [QuestionnaireRepository],
};

const getRuleQuestionnaireByQuestIdUseCaseFactory = (questionRepo: RuleQuestionnaireRepository) => new RuleQuestionnaireGetByQuestUseCase(questionRepo);
export const getRuleQuestionnaireByQuestIdUseProvider = {
    provide: RuleQuestionnaireGetByQuestUseCase,
    useFactory: getRuleQuestionnaireByQuestIdUseCaseFactory,
    deps: [RuleQuestionnaireRepository],
};

@NgModule({
    providers: [
        userLoginUseCaseProvider,
        userRegisterUseCaseProvider,
        { provide: UserRepository, useClass: UserImplementationRepository },
        getProfileByIdUseProvider,
        { provide: ProfileRepository, useClass: ProfileImplementationRepository },
        getQuestionnairesUseProvider,
        { provide: QuestionnaireRepository, useClass: QuestionnaireImplementationRepository },
        getRuleQuestionnaireByQuestIdUseProvider,
        { provide: RuleQuestionnaireRepository, useClass: RuleQuestionnaireImplementationRepository },
    ],
    imports: [CommonModule, HttpClientModule],
})
export class DataModule {}
