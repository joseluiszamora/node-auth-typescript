"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const infraestructure_1 = require("../../infraestructure");
const auth_middleware_1 = require("../middlewares/auth.middleware");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const dataSource = new infraestructure_1.AuthDataSourceImpl();
        const authRepository = new infraestructure_1.AuthRepositoryImpl(dataSource);
        const controller = new controller_1.AuthController(authRepository);
        router.post("/login", controller.loginUser);
        router.post("/register", controller.registerUser);
        router.get("/users", [auth_middleware_1.AuthMiddleware.validateJWT], controller.getUsers);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
