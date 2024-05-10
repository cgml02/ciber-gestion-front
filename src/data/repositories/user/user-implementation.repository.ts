import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserImplementationRepositoryMapper } from './mappers/user-repository.mapper';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserModel } from '../../../domain/models/user.model';
import { UserEntity } from './entities/user-entity';

@Injectable({
  providedIn: 'root',
})
export class UserImplementationRepository extends UserRepository {
  userMapper = new UserImplementationRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }

  login(params: { email: string; password: string }): Observable<UserModel> {
    return this.http
      .post<UserEntity>('url', { params })
      .pipe(map(this.userMapper.mapFrom));
  }

  register(params: {
    name: string;
    lastName: string;
    email: string;
    password: string;
  }): Observable<UserModel> {
    return this.http
      .post<UserEntity>('url', { params })
      .pipe(map(this.userMapper.mapFrom));
  }
}
