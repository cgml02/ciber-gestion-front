export interface UserEntity {
  userId: string;
  fk_profileId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
}
