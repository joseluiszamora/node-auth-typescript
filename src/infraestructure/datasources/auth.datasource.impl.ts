import {
  AuthDataSource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

export class AuthDataSourceImpl implements AuthDataSource {
  constructor() {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const {
      fk_profile,
      document,
      email,
      password,
      first_name,
      last_name,
      avatar,
    } = registerUserDto;

    try {
      // 1. Verificar si el correo existe
      // 2. Hashear la contraseña
      // 3. Mapear la respuesta a nuestra entidad
      return new UserEntity(
        fk_profile,
        document,
        email,
        password,
        first_name,
        last_name,
        avatar
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
