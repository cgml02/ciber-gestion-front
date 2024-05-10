import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserLoginUseCase } from '../domain/usecases/user/user-login.usecase';
import { UserRegisterUseCase } from '../domain/usecases/user/user-register.usecase';
import { UserImplementationRepository } from './repositories/user/user-implementation.repository';

const userLoginUseCaseFactory = (userRepo: UserRepository) =>
  new UserLoginUseCase(userRepo);
export const userLoginUseCaseProvider = {
  provide: UserLoginUseCase,
  useFactory: userLoginUseCaseFactory,
  deps: [UserRepository],
};

const userRegisterUseCaseFactory = (userRepo: UserRepository) =>
  new UserRegisterUseCase(userRepo);
export const userRegisterUseCaseProvider = {
  provide: UserRegisterUseCase,
  useFactory: userRegisterUseCaseFactory,
  deps: [UserRepository],
};

@NgModule({
  providers: [
    userLoginUseCaseProvider,
    userRegisterUseCaseProvider,
    { provide: UserRepository, useClass: UserImplementationRepository },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class DataModule {}
