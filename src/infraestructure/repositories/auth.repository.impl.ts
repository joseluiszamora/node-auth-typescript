import { AuthRepository, RegisterUserDto, UserEntity } from "../../domain";
import { AuthDataSource } from "../../domain/datasources/auth.datasource";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSource: AuthDataSource) {}

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDataSource.register(registerUserDto);
  }

  getUsers(): Promise<Array<UserEntity>> {
    return this.authDataSource.getUsers();
  }
}
