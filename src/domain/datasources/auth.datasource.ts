import { UserEntity } from "../entities/user.entity";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";

export abstract class AuthDataSource {
  // todo:
  // abstract login();

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
