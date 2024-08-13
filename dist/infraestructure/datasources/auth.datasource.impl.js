"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDataSourceImpl = void 0;
const client_1 = require("@prisma/client");
const config_1 = require("../../config");
const domain_1 = require("../../domain");
const user_mapper_1 = require("../mappers/user.mapper");
const library_1 = require("@prisma/client/runtime/library");
const prisma = new client_1.PrismaClient();
class AuthDataSourceImpl {
    constructor(hashPassword = config_1.BcryptAdapter.hash, comparePassword = config_1.BcryptAdapter.compare) {
        this.hashPassword = hashPassword;
        this.comparePassword = comparePassword;
    }
    login(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginUserDto;
            try {
                const user = yield prisma.user.findUnique({ where: { email } });
                if (!user)
                    throw domain_1.CustomError.badRequest("User does not exists - email");
                const isMatching = this.comparePassword(password, user.password);
                if (!isMatching)
                    throw domain_1.CustomError.badRequest("Password is not valid");
                return user_mapper_1.UserMapper.userEntityFromObject(user);
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prisma.user.findMany();
                var usersList = Array();
                for (const user of users) {
                    usersList.push(user_mapper_1.UserMapper.userEntityFromObject(user));
                }
                return usersList;
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    register(registerUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fk_profile, document, email, password, first_name, last_name, avatar, } = registerUserDto;
            try {
                // 1. Verificar si el document existe
                const exists = yield prisma.user.findUnique({
                    where: {
                        document,
                    },
                });
                if (exists)
                    throw domain_1.CustomError.badRequest("User already exists");
                // 2. Verificar si el profile existe
                const profile = yield prisma.profile.findUnique({
                    where: {
                        id: Number(fk_profile),
                    },
                });
                if (!profile)
                    throw domain_1.CustomError.badRequest("El perfil no existe");
                // 2. Hashear la contraseña
                // 3. Crear usuario en la DB
                const user = yield prisma.user.create({
                    data: {
                        document,
                        email,
                        first_name,
                        last_name,
                        password: this.hashPassword(password),
                        avatar,
                        profiles: {
                            connect: {
                                id: Number(fk_profile), // aca se fuerza el number, por que da errores por recibir string, revisar
                            },
                        },
                    },
                    include: {
                        profiles: true,
                    },
                });
                console.log(user);
                // 4. Mapear la respuesta a nuestra entidad
                return user_mapper_1.UserMapper.userEntityFromObject(user);
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError) {
                    if (error.code === "P2002") {
                        throw domain_1.CustomError.badRequest("Datos no validos,ya existe un usuario con el documento o correo");
                    }
                    console.log(error);
                }
                if (error instanceof library_1.PrismaClientValidationError) {
                    console.log(error);
                    throw domain_1.CustomError.badRequest("Datos no validos, problemas en la validacion");
                }
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                throw domain_1.CustomError.internalServer();
            }
        });
    }
}
exports.AuthDataSourceImpl = AuthDataSourceImpl;
