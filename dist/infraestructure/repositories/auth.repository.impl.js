"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepositoryImpl = void 0;
class AuthRepositoryImpl {
    constructor(authDataSource) {
        this.authDataSource = authDataSource;
    }
    login(loginUserDto) {
        return this.authDataSource.login(loginUserDto);
    }
    register(registerUserDto) {
        return this.authDataSource.register(registerUserDto);
    }
    getUsers() {
        return this.authDataSource.getUsers();
    }
}
exports.AuthRepositoryImpl = AuthRepositoryImpl;
