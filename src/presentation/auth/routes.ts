import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infraestructure";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const dataSource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(dataSource);
    const controller = new AuthController(authRepository);

    router.post("/login", controller.loginUser);

    router.post("/register", controller.registerUser);

    return router;
  }
}
