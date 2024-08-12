import { Request, Response } from "express";
import { CustomError, RegisterUser, RegisterUserDto } from "../../domain";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { JwtAdapter } from "../../config";

export class AuthController {
  // Inyeccion de dependencias
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error); // Winston
    return res.status(500).json({ error: "Internal Server Error" });
  };

  // login User
  loginUser = (req: Request, res: Response) => {
    res.json("login user controller");
  };

  // register User
  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
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
  getUsers = (req: Request, res: Response) => {
    this.authRepository
      .getUsers()
      .then((users) => res.json(users))
      .catch((error) => this.handleError(error, res));
  };
}
