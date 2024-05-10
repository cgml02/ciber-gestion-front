import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { UserRepository } from '../../repositories/user.repository';
import { UseCase } from '../../../base/use-case';

export class UserRegisterUseCase
  implements
    UseCase<
      { name: string; lastName: string; email: string; password: string },
      UserModel
    >
{
  constructor(private userRepository: UserRepository) {}

  execute(params: {
    name: string;
    lastName: string;
    email: string;
    password: string;
  }): Observable<UserModel> {
    return this.userRepository.register(params);
  }
}
