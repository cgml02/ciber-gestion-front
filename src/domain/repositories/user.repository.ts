import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

export abstract class UserRepository {
  abstract login(params: {
    email: string;
    password: string;
  }): Observable<UserModel>;

  abstract register(params: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Observable<UserModel>;
}
