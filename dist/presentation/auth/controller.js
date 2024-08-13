"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const domain_1 = require("../../domain");
const login_user_dto_1 = require("../../domain/dtos/auth/login-user.dto");
const login_user_use_case_1 = require("../../domain/use-cases/auth/login-user.use-case");
class AuthController {
    // Inyeccion de dependencias
    constructor(authRepository) {
        this.authRepository = authRepository;
        this.handleError = (error, res) => {
            if (error instanceof domain_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.log(error); // Winston
            return res.status(500).json({ error: "Internal Server Error" });
        };
        // login User
        this.loginUser = (req, res) => {
            const [error, loginUserDto] = login_user_dto_1.LoginUserDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new login_user_use_case_1.LoginUser(this.authRepository)
                .execute(loginUserDto)
                .then((data) => res.json(data))
                .catch((error) => this.handleError(error, res));
        };
        // register User
        this.registerUser = (req, res) => {
            const [error, registerUserDto] = domain_1.RegisterUserDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new domain_1.RegisterUser(this.authRepository)
                .execute(registerUserDto)
                .then((data) => res.json(data))
                .catch((error) => this.handleError(error, res));
            // this.authRepository
            //   .register(registerUserDto!)
            //   .then(async (user) =>
            //     res.json({
            //       user,
            //       token: await JwtAdapter.generateToken({ id: user.id }),
            //     })
            //   )
            //   .catch((error) => this.handleError(error, res));
        };
        // Get all Users
        this.getUsers = (req, res) => {
            this.authRepository
                .getUsers()
                .then((users) => res.json(users))
                .catch((error) => this.handleError(error, res));
        };
    }
}
exports.AuthController = AuthController;
